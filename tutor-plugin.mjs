/**
 * Vite plugin: mounts a POST /api/tutor SSE endpoint on both the dev server
 * (configureServer) and `vite preview` (configurePreviewServer), so the AI
 * tutor works in dev and in production-style deployments without a separate
 * backend process.
 *
 * Protocol (SSE, per the streaming-first house rule):
 *   request  -> POST { mode: 'explain'|'mark', lang: 'en'|'zh',
 *                     question: {stem, options?, answerIndex?, markScheme, marks, commandWord, tier},
 *                     studentAnswer?: string }
 *   response -> text/event-stream frames: data: {"content": "..."}  …  data: [DONE]
 *   failure  -> data: {"error": "..."} then [DONE]
 *
 * The coze-coding-dev-sdk is imported lazily inside the handler: vite.config
 * is bundled at config-load time, but the SDK only needs to exist when the
 * first tutor request arrives.
 */

const SYSTEM_PROMPTS = {
  explain: (lang) =>
    lang === 'zh'
      ? '你是一位 IGCSE 科学老师。学生会给你一道题和你已选/正确答案。请用简体中文简要讲解：为什么正确答案正确、常见错误选项错在哪（如有）。用 3-6 句话，可以用简短的要点。不要重复题目原文。'
      : 'You are an IGCSE science teacher. The student gives you a question plus the correct answer (and what they picked, if they did). Explain in 3-6 concise sentences, optionally with short bullet points: why the correct answer is right, and why tempting distractors are wrong. Do not restate the question.',
  mark: (lang) =>
    lang === 'zh'
      ? '你是一位 IGCSE 阅卷考官。学生给出了简答题答案，你手里有评分标准（mark scheme，每点 B1/B2…及分值）。请逐点批改：先给总得分（如 2/3），然后每个得分点一行——写明"得分"或"未得分"及原因。最后给一句最关键的改进建议。用简体中文。'
      : 'You are an IGCSE examiner. The student wrote a free-response answer; you have the mark scheme (B1/B2 points with marks). Mark it point by point: state the total first (e.g. 2/3), then one line per mark point — awarded or not, with a brief reason. End with the single most useful improvement tip.',
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

async function handleTutor(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end('method not allowed')
    return
  }

  let parsed
  try {
    parsed = JSON.parse(await readBody(req))
  } catch {
    res.statusCode = 400
    res.end('bad json')
    return
  }

  const { mode = 'explain', lang = 'en', question, studentAnswer } = parsed ?? {}
  if (!question?.stem) {
    res.statusCode = 422
    res.end('missing question')
    return
  }

  const abort = new AbortController()
  req.on('close', () => abort.abort())

  // SSE framing headers — no compression, no buffering.
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'Transfer-Encoding': 'chunked',
    'X-Accel-Buffering': 'no',
  })

  const send = (obj) => {
    res.write(`data: ${JSON.stringify(obj)}\n\n`)
  }

  try {
    const { LLMClient } = await import('coze-coding-dev-sdk')
    const client = new LLMClient()

    const schemeLines = (question.markScheme ?? [])
      .map((mp, i) => `B${i + 1} (${mp.marks} mk): ${mp.text}`)
      .join('\n')
    const optionsLines = question.options
      ? question.options.map((o, i) => `  ${'ABCD'[i]}. ${o}`).join('\n')
      : null

    const userLines = [
      `Command word: ${question.commandWord} · tier: ${question.tier} · marks: ${question.marks}`,
      `Question: ${question.stem}`,
      optionsLines ? `Options:\n${optionsLines}` : null,
      question.answerIndex !== undefined
        ? `Correct answer: ${'ABCD'[question.answerIndex]}. ${question.options?.[question.answerIndex] ?? ''}`
        : null,
      studentAnswer ? `Student's answer: ${studentAnswer}` : null,
      schemeLines ? `Mark scheme:\n${schemeLines}` : null,
      mode === 'mark' ? 'Mark the student answer against the scheme.' : 'Explain the answer to the student.',
    ].filter(Boolean)

    const messages = [
      { role: 'system', content: SYSTEM_PROMPTS[mode]?.(lang) ?? SYSTEM_PROMPTS.explain(lang) },
      { role: 'user', content: userLines.join('\n') },
    ]

    const stream = client.stream(
      messages,
      { model: 'doubao-seed-2-0-mini-260215', maxTokens: 800 },
      { signal: abort.signal },
    )

    for await (const chunk of stream) {
      if (chunk?.content) send({ content: chunk.content })
    }
    send({ done: true })
  } catch (err) {
    // Real call failed — surface the failure, never fabricate a reply.
    send({ error: err?.message ?? 'tutor request failed' })
  } finally {
    res.end('data: [DONE]\n\n')
  }
}

export function tutorPlugin() {
  return {
    name: 'igcse-tutor-api',
    configureServer(server) {
      server.middlewares.use('/api/tutor', handleTutor)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/tutor', handleTutor)
    },
  }
}
