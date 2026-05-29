// ============================================================
// @mathquest/types — Shared TypeScript interfaces
// Used by both frontend and backend to ensure contract safety
// ============================================================

// ── User & Auth ──────────────────────────────────────────────

export type UserRole = 'child' | 'parent' | 'admin'

export interface User {
  id: string
  email: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface ChildProfile {
  id: string
  userId: string
  displayName: string
  birthYear: number
  avatar: string
  currentLevel: number
  xp: number
  preferredLearningStyle?: LearningStyle
  createdAt: Date
}

export type LearningStyle = 'speed_learner' | 'deep_thinker' | 'visual_learner' | 'competitive' | 'explorer'

// ── Skills ───────────────────────────────────────────────────

export type SkillCategory = 'arithmetic' | 'fractions' | 'algebra' | 'geometry' | 'logic' | 'problem_solving'

export interface Skill {
  id: string
  slug: string
  name: string
  description: string
  category: SkillCategory
  difficultyRange: [number, number]
}

export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5

export interface SkillMastery {
  id: string
  childId: string
  skillId: string
  masteryLevel: MasteryLevel
  confidenceScore: number  // 0–100
  retentionScore: number   // 0–100
  lastReviewedAt: Date | null
}

// ── Questions ────────────────────────────────────────────────

export type QuestionType = 'multiple_choice' | 'input_answer' | 'true_false' | 'drag_drop' | 'pattern'

export interface Question {
  id: string
  skillId: string
  questionType: QuestionType
  difficulty: number  // 1–5
  content: QuestionContent
  explanation: string
  estimatedTimeMs: number
}

export interface QuestionContent {
  text: string
  imageUrl?: string
  mathExpression?: string
}

export interface QuestionChoice {
  id: string
  questionId: string
  choiceText: string
  isCorrect: boolean
}

// ── Quiz Session ─────────────────────────────────────────────

export type SessionType = 'placement' | 'practice' | 'review' | 'challenge'

export interface QuizSession {
  id: string
  childId: string
  startedAt: Date
  endedAt: Date | null
  fatigueScore: number  // 0–100
  totalXp: number
  sessionType: SessionType
}

export type ConfidenceLevel = 'low' | 'medium' | 'high'

export interface QuestionAttempt {
  id: string
  sessionId: string
  questionId: string
  childId: string
  answer: string
  isCorrect: boolean
  responseTimeMs: number
  hintsUsed: number
  confidenceLevel: ConfidenceLevel | null
  createdAt: Date
}

// ── Adaptive Engine ──────────────────────────────────────────

export type AdaptiveEventType =
  | 'difficulty_increase'
  | 'difficulty_decrease'
  | 'review_triggered'
  | 'fatigue_detected'
  | 'mastery_unlocked'
  | 'path_changed'

export interface AdaptiveEvent {
  id: string
  childId: string
  eventType: AdaptiveEventType
  previousDifficulty: number
  newDifficulty: number
  reason: string
  createdAt: Date
}

// ── Fatigue ──────────────────────────────────────────────────

export type FatigueType = 'cognitive' | 'emotional' | 'boredom' | 'frustration' | 'overload'

export interface FatigueLog {
  id: string
  childId: string
  sessionId: string
  fatigueScore: number  // 0–100
  fatigueType: FatigueType | null
  detectedReason: string
  createdAt: Date
}

// ── Gamification ─────────────────────────────────────────────

export type XpSource = 'lesson_complete' | 'streak' | 'mission' | 'achievement' | 'placement'

export interface XpLog {
  id: string
  childId: string
  amount: number
  source: XpSource
  createdAt: Date
}

export interface Achievement {
  id: string
  slug: string
  name: string
  description: string
  xpReward: number
  iconUrl: string
}

export interface StudentAchievement {
  id: string
  childId: string
  achievementId: string
  unlockedAt: Date
}

export interface Streak {
  id: string
  childId: string
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date | null
}

export type MissionType = 'daily_questions' | 'skill_practice' | 'speed_challenge' | 'review'

export interface DailyMission {
  id: string
  missionType: MissionType
  targetValue: number
  rewardXp: number
  title: string
  description: string
}

export interface StudentMissionProgress {
  id: string
  childId: string
  missionId: string
  currentProgress: number
  completed: boolean
}

// ── Analytics ────────────────────────────────────────────────

export interface LearningAnalytics {
  id: string
  childId: string
  strongestSkill: string | null
  weakestSkill: string | null
  avgAccuracy: number  // 0–100
  avgResponseTimeMs: number
  motivationScore: number  // 0–100
  updatedAt: Date
}

// ── API Contracts ────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: ApiError
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// ── Quiz API Contracts ────────────────────────────────────────

export interface StartQuizRequest {
  sessionType: SessionType
  skillId?: string
}

export interface StartQuizResponse {
  sessionId: string
  firstQuestion: Question & { choices: QuestionChoice[] }
}

export interface SubmitAnswerRequest {
  questionId: string
  answer: string
  responseTimeMs: number
  confidenceLevel?: ConfidenceLevel
}

export interface SubmitAnswerResponse {
  isCorrect: boolean
  correctAnswer: string
  explanation: string
  xpGained: number
  streak: number
  feedbackMessage: string
  nextQuestion?: Question & { choices: QuestionChoice[] }
  sessionComplete?: boolean
}
