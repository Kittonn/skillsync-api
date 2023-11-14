import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '@/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { hash } from '@/shared/utils/hash';
import {
  IActivateUserResponse,
  IActivationPayload,
  ICreateActivationToken,
  ILoginResponse,
  ILogoutResponse,
  IRegisterResponse,
} from '@/modules/auth/types/auth';
import { NodeMailerService } from '@/modules/node-mailer/node-mailer.service';
import { ActivationDto } from './dto/activation.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from '@/modules/auth/types/jwt';
import { RedisService } from '@/database/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
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

  private async createToken(payload: JwtPayload) {
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
    const emailExists = await this.usersService.findOne({
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

    const existUser = await this.usersService.findOne({ email: user.email });

    if (existUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hash(user.password);

    await this.usersService.create({
      ...user,
      password: hashedPassword,
    });

    return {
      message: 'User activated',
    };
  }

  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const existUser = await this.usersService.findOne({
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

    const updatedUser = await this.usersService.update({
      where: { id: existUser.id },
      data: { refreshToken },
    });

    await this.redisService.set(existUser.id, JSON.stringify(updatedUser));

    return token;
  }

  async logout(userId: string): Promise<ILogoutResponse> {
    await this.redisService.del(userId);
    await this.usersService.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return {
      message: 'User logged out',
    };
  }

  async refresh(userId: string) {
    const existUser = JSON.parse(await this.redisService.get(userId));

    if (!existUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: userId, role: existUser.role };
    const token = await this.createToken(payload);

    const refreshToken = await hash(token.refreshToken);

    await this.redisService.set(userId, JSON.stringify(existUser));

    await this.usersService.update({
      where: { id: userId },
      data: { refreshToken },
    });

    return token;
  }
}
