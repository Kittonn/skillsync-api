import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../../shared/interfaces/jwt.interface';
import { User } from '@/modules/users/schema/user.schema';
import { compare } from '@/shared/utils/encrypt.util';
import { Request } from 'express';
import { UsersRepository } from '@/modules/users/users.repository';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.refresh.secret'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload): Promise<User> {
    const refreshToken = request.headers.authorization.split(' ')[1];

    const user = await this.usersRepository.findOne({ _id: payload.sub });

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
