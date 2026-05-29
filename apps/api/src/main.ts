// ============================================================
// MathQuest API — NestJS Entry Point
// ============================================================

import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule)

  // ── Global Settings ──────────────────────────────────────
  app.setGlobalPrefix('api/v1')
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })

  // ── Validation Pipe ──────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  // ── Swagger Docs ─────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('MathQuest API')
      .setDescription('Adaptive Learning Platform API')
      .setVersion('1.0')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document)
    logger.log('📚 Swagger docs available at http://localhost:3001/api/docs')
  }

  // ── Start ─────────────────────────────────────────────────
  const port = process.env.PORT || 3001
  await app.listen(port)
  logger.log(`🚀 MathQuest API running on http://localhost:${port}`)
}

bootstrap()
