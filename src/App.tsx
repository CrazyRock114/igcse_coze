import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { NotFoundPage } from '@/components/NotFoundPage'
import { T } from '@/components/i18n/T'
import { SelectionTranslator } from '@/components/translator/SelectionTranslator'
import { SyncManager } from '@/components/auth/SyncManager'
import { TeacherGate } from '@/components/teacher/TeacherGate'
import { ErrorBoundary } from '@/components/ErrorBoundary'

/**
 * Route-level code splitting: each page is its own chunk, so the entry
 * bundle only carries the shell. `vite.config.ts` keeps vendor-three out
 * of the entry chunk entirely — the 3D stack is reachable only through
 * the lazy anatomy/lesson chunks (asserted by scripts/check-bundle-budget).
 */
const HomePage = lazy(() => import('@/components/HomePage').then((m) => ({ default: m.HomePage })))
const LessonPage = lazy(() =>
  import('@/components/lesson/LessonPage').then((m) => ({ default: m.LessonPage })),
)
const VocabPage = lazy(() => import('@/pages/VocabPage').then((m) => ({ default: m.VocabPage })))
const PracticalPage = lazy(() => import('@/components/practical/PracticalPage'))
const AnatomyPage = lazy(() =>
  import('@/components/anatomy/AnatomyPage').then((m) => ({ default: m.AnatomyPage })),
)
const TeacherDashboard = lazy(() =>
  import('@/components/teacher/TeacherDashboard').then((m) => ({ default: m.TeacherDashboard })),
)
const StudentDetail = lazy(() =>
  import('@/components/teacher/StudentDetail').then((m) => ({ default: m.StudentDetail })),
)

/** Minimal skeleton shown while a route chunk (and its first data fetch) streams in. */
function RouteFallback() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24" role="status" aria-live="polite">
      <div className="mx-auto h-8 w-48 animate-pulse rounded bg-ink/10" />
      <div className="mx-auto mt-6 h-64 w-full animate-pulse rounded-xl bg-ink/5" />
      <span className="sr-only">
        <T value={{ en: 'Loading…', zh: '加载中…' }} />
      </span>
    </div>
  )
}

export default function App() {
  return (
    // Vite's base is '/' locally and '/<repo>/' on GitHub Pages; the router has to agree
    // or every in-app link 404s on the deployed site.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* SyncManager is a side-effect-only component — it watches auth state
       * and bridges localStorage ↔ Supabase. Render once near the top. */}
      <SyncManager />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject/:subject" element={<HomePage />} />
          <Route path="/lesson/:subject/:slug" element={<LessonPage />} />
          <Route path="/anatomy/:subject/:slug" element={<AnatomyPage />} />
          <Route path="/practical" element={<PracticalPage />} />
          <Route
            path="/vocab"
            element={
              // The /vocab page is the most fragile one in the app — it
              // reads four localStorage keys with a v1→v2 schema migration
              // and has 7+ child components that all run useState hooks. If
              // any of them throw on mount (stale data, broken migration,
              // hook order), wrap the whole route so the user gets a
              // recovery card instead of a white screen.
              <ErrorBoundary label="vocabulary">
                <VocabPage />
              </ErrorBoundary>
            }
          />
          <Route
            path="/teacher"
            element={
              <TeacherGate>
                <TeacherDashboard />
              </TeacherGate>
            }
          />
          <Route
            path="/teacher/:userId"
            element={
              <TeacherGate>
                <StudentDetailWrapper />
              </TeacherGate>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {/* The translator is page-level chrome, not part of any route — it lives
       * here so it works on every page without each one opting in. */}
      <SelectionTranslator />
    </BrowserRouter>
  )
}

/**
 * Wrapper that re-mounts StudentDetail on every userId change so the
 * component's local state (loading skeleton, fetched data) is fresh
 * and we don't show a previous student's data while the new one loads.
 */
function StudentDetailWrapper() {
  const { userId } = useParams<{ userId: string }>()
  if (!userId) return null
  return <StudentDetail key={userId} />
}
