import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt';
import { User } from '@/users/schema/user.schema';
import { RedisService } from '@/database/redis/redis.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.refresh.secret'),
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
