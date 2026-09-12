/**
 * UI chrome strings for the Supabase auth widgets.
 *
 * Same `no-Chinese-in-components` rule as `vocabStrings.ts` and
 * `lessonExtrasStrings.ts`: any string the user sees goes here, the
 * component is pure markup.
 */

import type { Bilingual } from '@/content/types'

export const AUTH = {
  // Header pill
  signInLabel: { en: 'Sign in', zh: '登录' } satisfies Bilingual,
  signOutLabel: { en: 'Sign out', zh: '登出' } satisfies Bilingual,

  // Dialog — mode toggles + headings
  signInHeading: { en: 'Sign in', zh: '登录' } satisfies Bilingual,
  signUpHeading: { en: 'Create account', zh: '注册账号' } satisfies Bilingual,
  switchToSignUp: { en: 'Create account', zh: '没账号？注册' } satisfies Bilingual,
  switchToSignIn: { en: 'Have an account? Sign in', zh: '已有账号？登录' } satisfies Bilingual,

  // Dialog — form field labels
  nameLabel: { en: 'Name', zh: '名字' } satisfies Bilingual,
  avatarLabel: { en: 'Avatar', zh: '头像' } satisfies Bilingual,
  passwordLabel: { en: 'Password', zh: '密码' } satisfies Bilingual,

  // Dialog — submission
  submitSignIn: { en: 'Sign in', zh: '登录' } satisfies Bilingual,
  submitSignUp: { en: 'Create account', zh: '注册账号' } satisfies Bilingual,

  // "Not configured" fallback
  notConfiguredTitle: { en: 'Supabase not configured', zh: 'Supabase 尚未配置' } satisfies Bilingual,
  notConfiguredBody: {
    en: 'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local (and as GitHub Actions secrets for production) to enable sign-in.',
    zh: '在 .env.local 里设 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY（生产环境作为 GitHub Actions secrets）才能启用登录。',
  } satisfies Bilingual,

  // Privacy note under the form
  privacyNote: {
    en: 'Your word bank and mistake log are scoped to this account, so different people on the same browser can have separate progress.',
    zh: '你的生词本和错题本都绑定到本账号——同浏览器的不同人互不干扰。',
  } satisfies Bilingual,
} as const
