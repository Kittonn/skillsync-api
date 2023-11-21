import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/schema/user.schema';
import { hash } from '@/shared/utils/encrypt';
import {
  IActivateUserResponse,
  IActivationPayload,
  ICreateActivationToken,
  ICreateToken,
  ILoginResponse,
  ILogoutResponse,
  IRefreshTokenResponse,
  IRegisterResponse,
} from '@/shared/interfaces/auth.interface';
import { NodeMailerService } from '@/modules/node-mailer/node-mailer.service';
import { ActivationDto } from './dto/activation.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from '@/shared/interfaces/jwt.interface';
import { RedisService } from '@/database/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly nodeMailerService: NodeMailerService,
    private readonly redisService: RedisService,
  ) {}

  private async createActivationToken(
    user: User,
  ): Promise<ICreateActivationToken> {
    const activationCode = Math.floor(1000 + Math.random() * 9000);

    const payload = { activationCode, user } as IActivationPayload;

    const activationToken = this.jwtService.sign(payload, {
      secret: this.configService.get('activation.secret'),
      expiresIn: this.configService.get('activation.expiresIn'),
    });

    return { activationToken, activationCode };
  }

  private async verifyActivationToken(
    activationToken: string,
  ): Promise<IActivationPayload> {
    return this.jwtService.verify(activationToken, {
      secret: this.configService.get('activation.secret'),
    }) as IActivationPayload;
  }

  private async createToken(payload: JwtPayload): Promise<ICreateToken> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.access.secret'),
        expiresIn: this.configService.get('jwt.access.expiresIn'),
      }),
      this.jwtService.sign(payload, {
        secret: this.configService.get('jwt.refresh.secret'),
        expiresIn: this.configService.get('jwt.refresh.expiresIn'),
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async register(registerDto: RegisterDto): Promise<IRegisterResponse> {
    const emailExists = await this.usersRepository.findOne({
      email: registerDto.email,
    });

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    const { activationToken, activationCode } =
      await this.createActivationToken(registerDto as User);

    await this.nodeMailerService.sendEmail({
      to: registerDto.email,
      subject: 'Activate your account',
      template: 'activation-mail',
      context: {
        activationCode,
        user: {
          name: registerDto.name,
        },
      },
    });

    return {
      activationToken,
    };
  }

  async activate(activationDto: ActivationDto): Promise<IActivateUserResponse> {
    const { user, activationCode } = await this.verifyActivationToken(
      activationDto.activationToken,
    );

    if (activationCode !== +activationDto.activationCode) {
      throw new BadRequestException('Invalid activation code');
    }

    const existUser = await this.usersRepository.findOne({ email: user.email });

    if (existUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hash(user.password);

    await this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });

    return {
      message: 'User activated',
    };
  }

  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const existUser = await this.usersRepository.findOne({
      email: loginDto.email,
    });

    if (!existUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      existUser.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: existUser.id, role: existUser.role };
    const token = await this.createToken(payload);

    const refreshToken = await hash(token.refreshToken);

    const updatedUser = await this.usersRepository.update(
      { _id: existUser.id },
      { refreshToken },
    );

    await this.redisService.set(existUser.id, JSON.stringify(updatedUser));

    return token;
  }

  async logout(userId: string): Promise<ILogoutResponse> {
    await this.redisService.del(userId);
    await this.usersRepository.update({ _id: userId }, { refreshToken: null });
    return {
      message: 'User logged out',
    };
  }

  async refresh(userId: string): Promise<IRefreshTokenResponse> {
    const existUser = JSON.parse(await this.redisService.get(userId));

    if (!existUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: userId, role: existUser.role };
    const token = await this.createToken(payload);

    const refreshToken = await hash(token.refreshToken);

    const updatedUser = await this.usersRepository.update(
      { _id: userId },
      { refreshToken },
    );

    await this.redisService.set(userId, JSON.stringify(updatedUser));

    return token;
  }
}
