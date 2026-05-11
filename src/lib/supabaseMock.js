import {
  MOCK_SESSION,
  MOCK_USERS,
  MOCK_MODULES,
  MOCK_LESSONS,
  MOCK_PROGRESS,
  MOCK_QUIZ_QUESTIONS,
} from './mockData'
import {
  CONSULTANT_MINDSET_MODULE,
  CONSULTANT_MINDSET_LESSONS,
  CONSULTANT_MINDSET_QUIZ_QUESTIONS,
} from './consultantMindsetData'

const DEMO_MODULES = [
  CONSULTANT_MINDSET_MODULE,
  ...MOCK_MODULES.filter(module => module.id !== CONSULTANT_MINDSET_MODULE.id),
]

const DEMO_LESSONS = [
  ...CONSULTANT_MINDSET_LESSONS,
  ...MOCK_LESSONS.filter(lesson => lesson.module_id !== CONSULTANT_MINDSET_MODULE.id),
]

const DEMO_QUIZ_QUESTIONS = [
  ...CONSULTANT_MINDSET_QUIZ_QUESTIONS,
  ...MOCK_QUIZ_QUESTIONS.filter(question => question.module_id !== CONSULTANT_MINDSET_MODULE.id),
]

const DEMO_PROGRESS = MOCK_PROGRESS.filter(progress => progress.module_id !== CONSULTANT_MINDSET_MODULE.id)

const TABLES = {
  users: MOCK_USERS,
  modules: DEMO_MODULES,
  lessons: DEMO_LESSONS,
  user_progress: DEMO_PROGRESS,
  quiz_questions: DEMO_QUIZ_QUESTIONS,
  point_events: [],
}

class MockQueryBuilder {
  constructor(data) {
    this._data = Array.isArray(data) ? [...data] : data
    this._isSingle = false
  }

  select() { return this }

  eq(col, val) {
    if (Array.isArray(this._data)) {
      this._data = this._data.filter(r => r[col] === val)
    }
    return this
  }

  // Handles .eq('col', null) — matches rows where col is null
  neq(col, val) {
    if (Array.isArray(this._data)) {
      this._data = this._data.filter(r => r[col] !== val)
    }
    return this
  }

  in(col, values) {
    if (Array.isArray(this._data)) {
      this._data = this._data.filter(r => values.includes(r[col]))
    }
    return this
  }

  order(col, opts = {}) {
    if (Array.isArray(this._data)) {
      const dir = opts.ascending === false ? -1 : 1
      this._data = [...this._data].sort((a, b) => {
        const av = a[col] ?? 0
        const bv = b[col] ?? 0
        return av > bv ? dir : av < bv ? -dir : 0
      })
    }
    return this
  }

  limit(n) {
    if (Array.isArray(this._data)) this._data = this._data.slice(0, n)
    return this
  }

  // .single() — returns first row or null, rejects if empty
  single() {
    const row = Array.isArray(this._data) ? (this._data[0] ?? null) : this._data
    return Promise.resolve({ data: row, error: null })
  }

  // .maybeSingle() — like single() but returns null without error when empty
  maybeSingle() {
    const row = Array.isArray(this._data) ? (this._data[0] ?? null) : this._data
    return Promise.resolve({ data: row, error: null })
  }

  // insert() — no-op in demo mode, returns success
  insert() {
    return Promise.resolve({ data: null, error: null })
  }

  // Makes the builder directly awaitable
  then(resolve, reject) {
    return Promise.resolve({ data: this._data, error: null }).then(resolve, reject)
  }

  catch() { return this }
}

// Daily quiz rotates by day-of-year so it changes each day
function getDailyQuestion() {
  const dailyQuestions = DEMO_QUIZ_QUESTIONS.filter(q => q.module_id === null)
  if (!dailyQuestions.length) return []
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  const idx = dayOfYear % dailyQuestions.length
  return [dailyQuestions[idx]]
}

const noopChannel = {
  on() { return this },
  subscribe() { return this },
}

export const mockSupabase = {
  from(table) {
    // Daily quiz uses the rotating selection
    if (table === 'quiz_questions') {
      return {
        _allData: DEMO_QUIZ_QUESTIONS,
        _data: DEMO_QUIZ_QUESTIONS,
        select() { return this },
        eq(col, val) {
          if (val === null) {
            // Home screen daily quiz: eq('module_id', null) — rotate by day
            if (col === 'module_id') this._data = getDailyQuestion()
            else this._data = this._data.filter(r => r[col] === val)
          } else {
            this._data = this._allData.filter(r => r[col] === val)
          }
          return this
        },
        in(col, values) {
          this._data = this._data.filter(r => values.includes(r[col]))
          return this
        },
        order(col) {
          this._data = [...this._data].sort((a, b) => (a[col] ?? 0) > (b[col] ?? 0) ? 1 : -1)
          return this
        },
        limit(n) { this._data = this._data.slice(0, n); return this },
        single() { return Promise.resolve({ data: this._data[0] ?? null, error: null }) },
        maybeSingle() { return Promise.resolve({ data: this._data[0] ?? null, error: null }) },
        insert() { return Promise.resolve({ data: null, error: null }) },
        then(resolve, reject) { return Promise.resolve({ data: this._data, error: null }).then(resolve, reject) },
        catch() { return this },
      }
    }
    return new MockQueryBuilder(TABLES[table] ?? [])
  },

  auth: {
    getSession: () => Promise.resolve({ data: { session: MOCK_SESSION }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: () => Promise.resolve({ error: null }),
  },

  rpc: () => Promise.resolve({ data: null, error: null }),

  channel: () => noopChannel,

  removeChannel: () => {},
}
