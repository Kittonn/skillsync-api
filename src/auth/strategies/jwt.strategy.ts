import { RedisService } from '@/database/redis/redis.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TokenPayload } from '../types/jwt';
import { User } from '@/users/schema/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.access.secret'),
    });
  }

  async validate(payload: TokenPayload): Promise<User> {
    const user = await this.redisService.get(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return JSON.parse(user);
  }
}
