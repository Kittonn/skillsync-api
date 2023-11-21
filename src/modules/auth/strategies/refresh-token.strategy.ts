import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../../shared/interfaces/jwt.interface';
import { User } from '@/modules/users/schema/user.schema';
import { RedisService } from '@/database/redis/redis.service';
import { compare } from '@/shared/utils/encrypt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.refresh.secret'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload): Promise<User> {
    const refreshToken = request.headers.authorization.split(' ')[1];

    const user = JSON.parse(await this.redisService.get(payload.sub));

    if (!user) {
      throw new UnauthorizedException();
    }

    const isRefreshTokenValid = await compare(refreshToken, user.refreshToken);

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
