import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthenticationProvider } from '../auth.interface';
import { User } from '../../schemas/user.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider
  ) {
    super();
  }

  async deserializeUser(user: User, done: (err: Error, user: User) => void) {
    const databaseUser = await this.authService.findUser(user.discordId);

    return databaseUser ? done(null, databaseUser) : done(null, null);
  }

  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  }
}
