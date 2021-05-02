import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import * as session from 'express-session';
import MongoStore = require('connect-mongo');

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('/api');

  // Middlewares
  app.use(
    session({
      cookie: {
        maxAge: 1 * 24 * 60 * 60,
      },
      resave: false,
      saveUninitialized: false,
      secret: configService.get<string>('APP_SECRET'),
      store: MongoStore.create({
        mongoUrl: configService.get<string>('MONGO_URI'),
        ttl: 1 * 24 * 60 * 60,
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT || 3000, () => {
    Logger.log('Listening at http://localhost:3000/api');
  });
}

bootstrap();
