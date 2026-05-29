# 🧮 MathQuest

> Adaptive math learning for kids aged 5–18.
> Learn at your own pace, earn rewards, and grow stronger every day.

**Duolingo × Prodigy Math × RPG Game × AI Tutor**

---

## 🏗️ Architecture

```
mathquest/
├── apps/
│   ├── web/          → Next.js 14 frontend (child + parent UI)
│   └── api/          → NestJS backend (REST API)
│
├── packages/
│   ├── ui/           → Shared React component library + design tokens
│   ├── types/        → Shared TypeScript interfaces (frontend + backend)
│   ├── database/     → Prisma schema + client singleton
│   └── utils/        → Shared utility functions (XP, fatigue, etc.)
│
└── docs/             → Architecture documentation
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis 7+

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
# Root
cp .env.example .env

# Web app
cp apps/web/.env.example apps/web/.env.local

# API
cp apps/api/.env.example apps/api/.env
```

Edit `.env` with your database and Redis URLs.

### 3. Set up database

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed starter data
npm run db:seed
```

### 4. Start development

```bash
# Start all apps in parallel (Turborepo)
npm run dev

# Web:  http://localhost:3000
# API:  http://localhost:3001
# Docs: http://localhost:3001/api/docs
```

---

## 📦 Package Reference

| Package | Purpose |
|---------|---------|
| `@mathquest/types` | Shared TypeScript types for users, questions, quiz sessions, etc. |
| `@mathquest/ui` | Design tokens (colors, spacing, animations) + shared components |
| `@mathquest/database` | Prisma client singleton + schema |
| `@mathquest/utils` | XP calculation, fatigue scoring, spaced repetition, feedback messages |

---

## 🗄️ Database Overview

Core tables (Phase 1 MVP):

| Table | Purpose |
|-------|---------|
| `users` | Authentication + roles |
| `child_profiles` | Learning profile, XP, level |
| `skills` | Skill catalog (addition, fractions, etc.) |
| `skill_mastery` | Per-child mastery level (0–5) per skill |
| `questions` | Question bank |
| `question_attempts` | Every answer attempt — core analytics source |
| `quiz_sessions` | Session tracking |
| `xp_logs` | XP history |
| `streaks` | Consistency tracking |
| `achievements` | Achievement definitions |
| `daily_missions` | Daily mission definitions |

---

## 🔌 API Routes

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me

GET    /api/v1/users/profile
GET    /api/v1/users/progress

POST   /api/v1/placement/start
POST   /api/v1/placement/answer
GET    /api/v1/placement/result

POST   /api/v1/quiz/start
GET    /api/v1/quiz/question
POST   /api/v1/quiz/answer
POST   /api/v1/quiz/finish

GET    /api/v1/skills
GET    /api/v1/skills/mastery

GET    /api/v1/gamification/profile
GET    /api/v1/gamification/missions
GET    /api/v1/gamification/achievements

GET    /api/v1/analytics/overview
GET    /api/v1/parent/overview
```

---

## 📋 Development Phases

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 1** | Foundation + Auth UI | 🔨 Next |
| Phase 2 | Quiz Engine | ⏳ Planned |
| Phase 3 | Adaptive Engine | ⏳ Planned |
| Phase 4 | Gamification | ⏳ Planned |
| Phase 5 | AI Features | ⏳ Planned |
| Phase 6 | Scale SaaS | ⏳ Planned |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion |
| Backend | NestJS, TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Cache | Redis |
| Monorepo | Turborepo |

---

## 🎨 Design System

Inspired by Duolingo + Prodigy Math + Nintendo UI.

- **Font**: Nunito (rounded, friendly, readable)
- **Primary**: Indigo/Violet (#6366F1)
- **XP Color**: Amber (#F59E0B)
- **Style**: Rounded cards, soft shadows, mobile-first

---

## 📖 Documentation

See `/docs` for full architecture guides.
See `/mnt/project/*.md` for system design specifications.
