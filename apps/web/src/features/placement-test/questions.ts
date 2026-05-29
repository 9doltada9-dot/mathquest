// ============================================================
// Placement Test — Types & Question Bank
// ============================================================

export type SkillTag = 'arithmetic' | 'fractions' | 'logic' | 'pattern' | 'algebra'
export type Difficulty = 1 | 2 | 3 | 4 | 5

export interface PlacementQuestion {
  id: string
  skill: SkillTag
  difficulty: Difficulty
  question: string
  choices: string[]
  correct: number // index of correct choice
  hint: string
  explanation: string
}

export interface QuestionAttempt {
  questionId: string
  skill: SkillTag
  difficulty: Difficulty
  correct: boolean
  responseTimeMs: number
  usedHint: boolean
}

export interface SkillScore {
  skill: SkillTag
  level: number       // 1–5
  label: string
  emoji: string
  correct: number
  total: number
}

export interface PlacementResult {
  overallLevel: number
  skills: SkillScore[]
  personality: LearningPersonality
  recommendedStart: string
  strengths: string[]
  focusAreas: string[]
}

export type LearningPersonality = 'speed_learner' | 'deep_thinker' | 'visual_learner' | 'explorer' | 'competitive'

export const PERSONALITY_INFO: Record<LearningPersonality, { label: string; emoji: string; desc: string; color: string }> = {
  speed_learner:  { label: 'Speed Learner',  emoji: '⚡', desc: 'You think fast and love quick challenges!',  color: '#FEF3C7' },
  deep_thinker:   { label: 'Deep Thinker',   emoji: '🔍', desc: 'You take your time and think carefully.',    color: '#DBEAFE' },
  visual_learner: { label: 'Visual Learner', emoji: '👁️', desc: 'You learn best with patterns and pictures.', color: '#D1FAE5' },
  explorer:       { label: 'Explorer',       emoji: '🗺️', desc: 'You love discovering new ideas!',            color: '#EDE9FE' },
  competitive:    { label: 'Competitor',     emoji: '🏆', desc: 'You love challenges and beating records!',   color: '#FFE4E6' },
}

export const SKILL_INFO: Record<SkillTag, { label: string; emoji: string; color: string; accent: string }> = {
  arithmetic: { label: 'Arithmetic', emoji: '🔢', color: '#DBEAFE', accent: '#3B82F6' },
  fractions:  { label: 'Fractions',  emoji: '🍕', color: '#FEF3C7', accent: '#F59E0B' },
  logic:      { label: 'Logic',      emoji: '🧠', color: '#EDE9FE', accent: '#8B5CF6' },
  pattern:    { label: 'Patterns',   emoji: '🎨', color: '#D1FAE5', accent: '#10B981' },
  algebra:    { label: 'Algebra',    emoji: '📐', color: '#FFE4E6', accent: '#F43F5E' },
}

// ── Question Bank ─────────────────────────────────────────────

export const QUESTIONS: PlacementQuestion[] = [
  // ── ARITHMETIC ──────────────────────────────────────────────
  {
    id: 'a1', skill: 'arithmetic', difficulty: 1,
    question: 'What is 3 + 5?',
    choices: ['6', '7', '8', '9'], correct: 2,
    hint: 'Count up from 3 five times.',
    explanation: '3 + 5 = 8. Count: 4, 5, 6, 7, 8',
  },
  {
    id: 'a2', skill: 'arithmetic', difficulty: 1,
    question: 'What is 10 - 4?',
    choices: ['5', '6', '7', '8'], correct: 1,
    hint: 'Start at 10 and count back 4.',
    explanation: '10 - 4 = 6',
  },
  {
    id: 'a3', skill: 'arithmetic', difficulty: 2,
    question: 'What is 7 × 8?',
    choices: ['54', '56', '58', '64'], correct: 1,
    hint: '7 × 8 is in the times tables.',
    explanation: '7 × 8 = 56',
  },
  {
    id: 'a4', skill: 'arithmetic', difficulty: 2,
    question: 'What is 48 ÷ 6?',
    choices: ['6', '7', '8', '9'], correct: 2,
    hint: 'What times 6 equals 48?',
    explanation: '48 ÷ 6 = 8, because 6 × 8 = 48',
  },
  {
    id: 'a5', skill: 'arithmetic', difficulty: 3,
    question: 'What is 125 + 87?',
    choices: ['202', '210', '212', '222'], correct: 2,
    hint: 'Add the ones first: 5+7=12, carry the 1.',
    explanation: '125 + 87 = 212',
  },
  {
    id: 'a6', skill: 'arithmetic', difficulty: 3,
    question: 'What is 15 × 12?',
    choices: ['160', '170', '180', '190'], correct: 2,
    hint: '15 × 12 = 15 × 10 + 15 × 2',
    explanation: '15 × 12 = 150 + 30 = 180',
  },
  {
    id: 'a7', skill: 'arithmetic', difficulty: 4,
    question: 'What is 256 ÷ 16?',
    choices: ['14', '15', '16', '17'], correct: 2,
    hint: '16 × 16 = ?',
    explanation: '256 ÷ 16 = 16, because 16 × 16 = 256',
  },
  {
    id: 'a8', skill: 'arithmetic', difficulty: 5,
    question: 'What is 17²?',
    choices: ['269', '279', '289', '299'], correct: 2,
    hint: '17² = 17 × 17. Try (20-3)² = 400 - 120 + 9',
    explanation: '17 × 17 = 289',
  },

  // ── FRACTIONS ────────────────────────────────────────────────
  {
    id: 'f1', skill: 'fractions', difficulty: 1,
    question: 'Which fraction is bigger: 1/2 or 1/4?',
    choices: ['1/4', '1/2', 'They are equal', 'Cannot tell'], correct: 1,
    hint: 'A bigger bottom number means smaller pieces.',
    explanation: '1/2 is bigger. Halves are larger than quarters.',
  },
  {
    id: 'f2', skill: 'fractions', difficulty: 2,
    question: 'What is 1/4 + 1/4?',
    choices: ['1/8', '1/4', '1/2', '2/4'], correct: 2,
    hint: 'Same denominator — just add the tops.',
    explanation: '1/4 + 1/4 = 2/4 = 1/2',
  },
  {
    id: 'f3', skill: 'fractions', difficulty: 3,
    question: 'What is 2/3 + 1/6?',
    choices: ['3/9', '4/6', '5/6', '1'], correct: 2,
    hint: 'Convert 2/3 to sixths first.',
    explanation: '2/3 = 4/6, so 4/6 + 1/6 = 5/6',
  },
  {
    id: 'f4', skill: 'fractions', difficulty: 4,
    question: 'What is 3/4 × 2/3?',
    choices: ['1/4', '1/2', '6/7', '5/12'], correct: 1,
    hint: 'Multiply tops together, then bottoms.',
    explanation: '3/4 × 2/3 = 6/12 = 1/2',
  },
  {
    id: 'f5', skill: 'fractions', difficulty: 5,
    question: 'What is 5/6 ÷ 5/12?',
    choices: ['1/2', '1', '2', '3'], correct: 2,
    hint: 'Flip the second fraction and multiply.',
    explanation: '5/6 ÷ 5/12 = 5/6 × 12/5 = 60/30 = 2',
  },

  // ── LOGIC ────────────────────────────────────────────────────
  {
    id: 'l1', skill: 'logic', difficulty: 1,
    question: 'If all cats have tails, and Whiskers is a cat, does Whiskers have a tail?',
    choices: ['Yes', 'No', 'Maybe', 'Not enough info'], correct: 0,
    hint: 'Apply the rule to Whiskers.',
    explanation: 'Yes! If ALL cats have tails, and Whiskers is a cat, then Whiskers must have a tail.',
  },
  {
    id: 'l2', skill: 'logic', difficulty: 2,
    question: 'Sam is taller than Alex. Alex is taller than Jordan. Who is the shortest?',
    choices: ['Sam', 'Alex', 'Jordan', 'Cannot tell'], correct: 2,
    hint: 'Put them in order: Sam > Alex > Jordan.',
    explanation: 'Jordan is shortest. Order: Sam > Alex > Jordan.',
  },
  {
    id: 'l3', skill: 'logic', difficulty: 3,
    question: 'A bag has 3 red balls and 2 blue balls. What is the probability of picking a red ball?',
    choices: ['1/5', '2/5', '3/5', '2/3'], correct: 2,
    hint: 'Probability = favorable ÷ total.',
    explanation: '3 red out of 5 total = 3/5',
  },
  {
    id: 'l4', skill: 'logic', difficulty: 4,
    question: 'If A → B and B → C, what can we conclude?',
    choices: ['A → C', 'C → A', 'B → A', 'None'], correct: 0,
    hint: 'Chain the logic: if A causes B, and B causes C...',
    explanation: 'A → B and B → C means A → C (transitive logic).',
  },
  {
    id: 'l5', skill: 'logic', difficulty: 5,
    question: 'In a race, A finished before B, B finished before D, C finished before B. Who finished last?',
    choices: ['A', 'B', 'C', 'D'], correct: 3,
    hint: 'Build the full order step by step.',
    explanation: 'Order: A, C, B, D — so D finished last.',
  },

  // ── PATTERN ──────────────────────────────────────────────────
  {
    id: 'p1', skill: 'pattern', difficulty: 1,
    question: 'What comes next: 2, 4, 6, 8, ___?',
    choices: ['9', '10', '11', '12'], correct: 1,
    hint: 'Each number increases by the same amount.',
    explanation: 'The pattern adds 2 each time. 8 + 2 = 10',
  },
  {
    id: 'p2', skill: 'pattern', difficulty: 2,
    question: 'What comes next: 1, 3, 9, 27, ___?',
    choices: ['36', '54', '81', '108'], correct: 2,
    hint: 'Each number is multiplied by the same amount.',
    explanation: 'Each number is multiplied by 3. 27 × 3 = 81',
  },
  {
    id: 'p3', skill: 'pattern', difficulty: 3,
    question: 'What comes next: 1, 1, 2, 3, 5, 8, ___?',
    choices: ['11', '12', '13', '16'], correct: 2,
    hint: 'Each number is the sum of the two before it.',
    explanation: 'Fibonacci sequence! 5 + 8 = 13',
  },
  {
    id: 'p4', skill: 'pattern', difficulty: 4,
    question: 'What is the 10th term of: 3, 7, 11, 15...?',
    choices: ['37', '39', '41', '43'], correct: 1,
    hint: 'Formula: first term + (n-1) × difference',
    explanation: '3 + (10-1) × 4 = 3 + 36 = 39',
  },

  // ── ALGEBRA ──────────────────────────────────────────────────
  {
    id: 'al1', skill: 'algebra', difficulty: 2,
    question: 'If x + 5 = 12, what is x?',
    choices: ['5', '6', '7', '8'], correct: 2,
    hint: 'Subtract 5 from both sides.',
    explanation: 'x = 12 - 5 = 7',
  },
  {
    id: 'al2', skill: 'algebra', difficulty: 3,
    question: 'If 3x = 21, what is x?',
    choices: ['5', '6', '7', '8'], correct: 2,
    hint: 'Divide both sides by 3.',
    explanation: 'x = 21 ÷ 3 = 7',
  },
  {
    id: 'al3', skill: 'algebra', difficulty: 4,
    question: 'If 2x + 3 = 11, what is x?',
    choices: ['3', '4', '5', '6'], correct: 1,
    hint: 'First subtract 3, then divide by 2.',
    explanation: '2x = 11 - 3 = 8, so x = 4',
  },
  {
    id: 'al4', skill: 'algebra', difficulty: 5,
    question: 'If x² - 5x + 6 = 0, what are the values of x?',
    choices: ['x=1,x=6', 'x=2,x=3', 'x=-2,x=-3', 'x=1,x=5'], correct: 1,
    hint: 'Find two numbers that multiply to 6 and add to -5.',
    explanation: '(x-2)(x-3)=0, so x=2 or x=3',
  },
]
