// ============================================================
// Database Seed — Starter data for MathQuest
// Run: npm run db:seed (from packages/database)
// ============================================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding MathQuest database...')

  // ── Seed Skills ──────────────────────────────────────────

  const skills = await Promise.all([
    prisma.skill.upsert({
      where: { slug: 'addition-basic' },
      update: {},
      create: {
        slug: 'addition-basic',
        name: 'Basic Addition',
        description: 'Adding numbers up to 20',
        category: 'arithmetic',
        difficultyMin: 1,
        difficultyMax: 2,
        sortOrder: 1,
      },
    }),
    prisma.skill.upsert({
      where: { slug: 'subtraction-basic' },
      update: {},
      create: {
        slug: 'subtraction-basic',
        name: 'Basic Subtraction',
        description: 'Subtracting numbers up to 20',
        category: 'arithmetic',
        difficultyMin: 1,
        difficultyMax: 2,
        sortOrder: 2,
      },
    }),
    prisma.skill.upsert({
      where: { slug: 'multiplication-tables' },
      update: {},
      create: {
        slug: 'multiplication-tables',
        name: 'Multiplication Tables',
        description: 'Times tables from 1–12',
        category: 'arithmetic',
        difficultyMin: 2,
        difficultyMax: 3,
        sortOrder: 3,
      },
    }),
    prisma.skill.upsert({
      where: { slug: 'fractions-intro' },
      update: {},
      create: {
        slug: 'fractions-intro',
        name: 'Introduction to Fractions',
        description: 'Understanding halves, thirds, and quarters',
        category: 'fractions',
        difficultyMin: 2,
        difficultyMax: 3,
        sortOrder: 4,
      },
    }),
    prisma.skill.upsert({
      where: { slug: 'logic-patterns' },
      update: {},
      create: {
        slug: 'logic-patterns',
        name: 'Logic & Patterns',
        description: 'Recognizing patterns and sequences',
        category: 'logic',
        difficultyMin: 1,
        difficultyMax: 4,
        sortOrder: 5,
      },
    }),
  ])

  console.log(`✅ Created ${skills.length} skills`)

  // ── Seed Achievements ────────────────────────────────────

  const achievements = await Promise.all([
    prisma.achievement.upsert({
      where: { slug: 'first-win' },
      update: {},
      create: {
        slug: 'first-win',
        name: 'First Win! 🎉',
        description: 'Complete your first question correctly',
        xpReward: 50,
        iconUrl: '/icons/achievements/first-win.svg',
      },
    }),
    prisma.achievement.upsert({
      where: { slug: '7-day-explorer' },
      update: {},
      create: {
        slug: '7-day-explorer',
        name: '7-Day Explorer 🗺️',
        description: 'Study for 7 days in a row',
        xpReward: 200,
        iconUrl: '/icons/achievements/streak-7.svg',
      },
    }),
    prisma.achievement.upsert({
      where: { slug: 'speed-solver' },
      update: {},
      create: {
        slug: 'speed-solver',
        name: 'Speed Solver ⚡',
        description: 'Answer 10 questions in under 5 seconds each',
        xpReward: 150,
        iconUrl: '/icons/achievements/speed.svg',
      },
    }),
    prisma.achievement.upsert({
      where: { slug: 'never-give-up' },
      update: {},
      create: {
        slug: 'never-give-up',
        name: 'Never Give Up 💪',
        description: 'Retry a question 3 times and get it right',
        xpReward: 100,
        iconUrl: '/icons/achievements/persistence.svg',
      },
    }),
  ])

  console.log(`✅ Created ${achievements.length} achievements`)

  // ── Seed Daily Missions ───────────────────────────────────

  const missions = await Promise.all([
    prisma.dailyMission.upsert({
      where: { id: 'mission-daily-5' },
      update: {},
      create: {
        id: 'mission-daily-5',
        missionType: 'daily_questions',
        targetValue: 5,
        rewardXp: 30,
        title: 'Quick Start',
        description: 'Answer 5 questions today',
      },
    }),
    prisma.dailyMission.upsert({
      where: { id: 'mission-review-1' },
      update: {},
      create: {
        id: 'mission-review-1',
        missionType: 'skill_practice',
        targetValue: 1,
        rewardXp: 50,
        title: 'Review Champion',
        description: 'Complete 1 review session',
      },
    }),
  ])

  console.log(`✅ Created ${missions.length} missions`)

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
