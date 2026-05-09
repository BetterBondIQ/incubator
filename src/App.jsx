import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { supabase } from './lib/supabase'
import { useAuthStore } from './store/useAuthStore'
import { usePointsStore } from './store/usePointsStore'

import { AppShell } from './components/layout/AppShell'
import { LoginScreen } from './screens/Auth/LoginScreen'
import { OTPScreen } from './screens/Auth/OTPScreen'
import { HomeScreen } from './screens/Home/HomeScreen'
import { LearnScreen } from './screens/Learn/LearnScreen'
import { ModuleDetail } from './screens/Learn/ModuleDetail'
import { LessonView } from './screens/Learn/LessonView'
import { QuizScreen } from './screens/Learn/QuizScreen'
import { RankScreen } from './screens/Rank/RankScreen'
import { ProfileScreen } from './screens/Profile/ProfileScreen'

function ProtectedRoute({ children }) {
  const { session, loading } = useAuthStore()
  if (loading) return <div style={{ height: '100dvh', background: 'var(--bb-navy-dark)' }} />
  if (!session) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const { setSession, setUser, setProfile, setLoading } = useAuthStore()
  const { setPoints } = usePointsStore()

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) loadProfile(session.user.id)
        else setLoading(false)
      })
      .catch(() => setLoading(false))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) loadProfile(session.user.id)
      else setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadProfile(userId) {
    try {
      // Update streak — awards daily login pts, idempotent (safe on every reload)
      await supabase.rpc('update_login_streak', { p_user_id: userId })

      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (data) {
        setProfile(data)
        setPoints(data.total_points ?? 0, data.monthly_points ?? 0)
      }
    } catch {
      // Profile load failure should not block the app
    } finally {
      setLoading(false)
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/login/verify" element={<OTPScreen />} />

        <Route path="/" element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomeScreen />} />
          <Route path="learn" element={<LearnScreen />} />
          <Route path="learn/:moduleId" element={<ModuleDetail />} />
          <Route path="learn/:moduleId/lesson/:lessonId" element={<LessonView />} />
          <Route path="learn/:moduleId/quiz" element={<QuizScreen />} />
          <Route path="rank" element={<RankScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
