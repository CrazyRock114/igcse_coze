import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { HomePage } from '@/components/HomePage'
import { LessonPage } from '@/components/lesson/LessonPage'
import { VocabPage } from '@/pages/VocabPage'
import { AnatomyPage } from '@/components/anatomy/AnatomyPage'
import { SelectionTranslator } from '@/components/translator/SelectionTranslator'
import { SyncManager } from '@/components/auth/SyncManager'
import { TeacherGate } from '@/components/teacher/TeacherGate'
import { TeacherDashboard } from '@/components/teacher/TeacherDashboard'
import { StudentDetail } from '@/components/teacher/StudentDetail'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function App() {
  return (
    // Vite's base is '/' locally and '/<repo>/' on GitHub Pages; the router has to agree
    // or every in-app link 404s on the deployed site.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* SyncManager is a side-effect-only component — it watches auth state
       * and bridges localStorage ↔ Supabase. Render once near the top. */}
      <SyncManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subject/:subject" element={<HomePage />} />
        <Route path="/lesson/:subject/:slug" element={<LessonPage />} />
        <Route path="/anatomy/:subject/:slug" element={<AnatomyPage />} />
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
        <Route path="*" element={<HomePage />} />
      </Routes>
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
