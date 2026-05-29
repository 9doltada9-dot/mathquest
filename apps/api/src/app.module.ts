// ============================================================
// AppModule — Root NestJS Module
// ============================================================

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { QuizModule } from './modules/quiz/quiz.module'
import { AdaptiveModule } from './modules/adaptive/adaptive.module'
import { GamificationModule } from './modules/gamification/gamification.module'
import { AnalyticsModule } from './modules/analytics/analytics.module'
import { PlacementModule } from './modules/placement/placement.module'

@Module({
  imports: [
    // ── Config ──────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // ── Feature Modules ──────────────────────────────────────
    AuthModule,
    UsersModule,
    QuizModule,
    AdaptiveModule,
    GamificationModule,
    AnalyticsModule,
    PlacementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
