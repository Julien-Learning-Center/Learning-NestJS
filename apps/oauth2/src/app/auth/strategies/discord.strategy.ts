import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';

import { AuthenticationProvider } from '../auth.interface';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
    private readonly configService: ConfigService
  ) {
    super({
      callbackUrl: configService.get<string>('DISCORD_CALLBACK_URL'),
      clientID: configService.get<string>('DISCORD_CLIENT_ID'),
      clientSecret: configService.get<string>('DISCORD_CLIENT_SECRET'),
      scope: ['identify', 'guilds'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { avatar, discriminator, id: discordId, username } = profile;

    return await this.authService.validateUser({
      accessToken,
      avatar,
      discordId,
      discriminator,
      refreshToken,
      username,
    });
  }
}
