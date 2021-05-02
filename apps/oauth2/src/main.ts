import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import * as session from 'express-session';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  // Middlewares
  app.use(
    session({
      cookie: {
        maxAge: 86400000,
      },
      resave: false,
      saveUninitialized: false,
      secret: 'makesuretoputthisinenv',
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT || 3000, () => {
    Logger.log('Listening at http://localhost:3000/api');
  });
}

bootstrap();
