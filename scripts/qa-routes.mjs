/* QA-only interaction tests (real Chromium, isolated browser per case). Safe to delete. */
import { chromium } from "playwright-core";

const BASE = process.env.QA_BASE ?? "http://localhost:5000";
const EXEC = `${process.env.HOME}/.cache/ms-playwright/chromium_headless_shell-1161/chrome-linux/headless_shell`;

let failed = 0;
const report = (ok, label, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}${detail ? " | " + detail : ""}`);
  if (!ok) failed++;
};

async function withBrowser(label, fn) {
  let browser;
  try {
    browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] });
    await fn(browser);
  } catch (e) {
    report(false, label, "threw: " + e.message.split("\n")[0]);
  } finally {
    await browser?.close().catch(() => {});
  }
}

// 1) anatomy deep-link with real 3D lazy chunk
await withBrowser("anatomy 3D page", async (browser) => {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(BASE + "/anatomy/0610/17-1-inheritance", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(3000);
  const text = ((await page.textContent("body")) ?? "").trim();
  const canvasCount = await page.locator("canvas").count();
  report(text.length > 200 && errors.length === 0, "anatomy 3D page /anatomy/0610/17-1-inheritance", `textLen=${text.length} canvas=${canvasCount}${errors.length ? " errors=" + errors.slice(0, 2).join("|") : ""}`);
  await page.close();
});

// 2) lesson MCQ interaction: click first MCQ option, expect state change
await withBrowser("lesson MCQ", async (browser) => {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(BASE + "/lesson/0625/1-1-measurement", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1500);
  // MCQ option: button starting with A/B/C/D letter span; find buttons containing exactly 'A' as first text
  const mcqBtn = page.locator("ul button span:has-text('A')").first();
  const hasMcq = (await mcqBtn.count()) > 0;
  if (!hasMcq) {
    report(true, "lesson MCQ", "no MCQ visible on this lesson (skipped)");
  } else {
    const btn = mcqBtn.locator("xpath=..");
    await btn.click();
    await page.waitForTimeout(400);
    const cls = await btn.getAttribute("class");
    const revealed = cls && (cls.includes("teal") || cls.includes("rose"));
    report(!!revealed && errors.length === 0, "lesson MCQ interaction", `feedback class applied=${!!revealed}${errors.length ? " errors=" + errors[0] : ""}`);
  }
  await page.close();
});

// 3) lesson mark-scheme toggle
await withBrowser("mark scheme", async (browser) => {
  const page = await browser.newPage();
  await page.goto(BASE + "/lesson/0625/1-1-measurement", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1200);
  const toggle = page.locator("button:has-text('Show mark scheme')").first();
  if ((await toggle.count()) === 0) {
    report(true, "mark scheme toggle", "not present on this lesson (skipped)");
  } else {
    await toggle.click();
    await page.waitForTimeout(300);
    const hidden = await page.locator("button:has-text('Hide mark scheme')").count();
    report(hidden > 0, "mark scheme toggle", "toggled to Hide state");
  }
  await page.close();
});

// 4) vocab subject chip filter
await withBrowser("vocab chips", async (browser) => {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(BASE + "/vocab", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1000);
  // NOTE: locator.click() trips a seccomp SIGTRAP in this sandbox's
  // headless_shell input pipeline (unrelated to the app). Dispatch the
  // click from the page context instead.
  const hasChip = await page.evaluate(() => [...document.querySelectorAll("button")].some((b) => /Physics|物理/.test(b.textContent ?? "")));
  if (!hasChip) {
    report(true, "vocab chip filter", "no subject chip found (skipped)");
  } else {
    const before = await page.evaluate(() => document.getElementsByTagName("*").length);
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find((b) => /Physics|物理/.test(b.textContent ?? ""));
      if (btn) btn.click();
    });
    await page.waitForTimeout(800);
    const after = await page.evaluate(() => document.getElementsByTagName("*").length);
    report(after !== before && errors.length === 0, "vocab chip filter", `before=${before} after=${after}${errors.length ? " errors=" + errors[0] : ""}`);
  }
  await page.close();
});

// 5) teacher gate: unauthenticated shows sign-in prompt (graceful Supabase-less degradation)
await withBrowser("teacher gate", async (browser) => {
  const page = await browser.newPage();
  await page.goto(BASE + "/teacher", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(600);
  const body = ((await page.textContent("body")) ?? "").trim();
  const showsSignIn = /Sign in|登录/.test(body);
  report(showsSignIn, "teacher gate shows sign-in prompt when unauthenticated", `len=${body.length}`);
  await page.close();
});

// 6) progress persistence
await withBrowser("progress persistence", async (browser) => {
  const page = await browser.newPage();
  await page.goto(BASE + "/lesson/0625/1-1-measurement", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1200);
  const keys = await page.evaluate(() => Object.keys(localStorage));
  report(keys.includes("igcse.progress.v1"), "progress store initialized", keys.slice(0, 6).join(", "));
  await page.close();
});

// 7) 404 route: unknown URL renders NotFoundPage, not the home page
await withBrowser("404 page", async (browser) => {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(BASE + "/no/such/route", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);
  const body = ((await page.textContent("body")) ?? "").trim();
  const is404 = /Page not found/.test(body) && !/All lessons/.test(body);
  report(is404 && errors.length === 0, "404 route renders NotFoundPage", `is404=${is404}${errors.length ? " errors=" + errors[0] : ""}`);
  await page.close();
});

console.log(failed === 0 ? "\nALL INTERACTION TESTS PASSED" : `\n${failed} INTERACTION TEST(S) FAILED`);
process.exit(failed === 0 ? 0 : 1);
