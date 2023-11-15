import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../../shared/interfaces/jwt';
import { User } from '@prisma/client';
import { RedisService } from '@/database/redis/redis.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.access.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.redisService.get(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return JSON.parse(user);
  }
}
