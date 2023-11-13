import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from '@/users/schema/user.schema';
import {
  IActivateUserResponse,
  IActivationPayload,
  ICreateActivationToken,
  ILoginResponse,
  IRegisterResponse,
} from '@/auth/types/auth';
import { NodeMailerService } from '@/node-mailer/node-mailer.service';
import { ActivationDto } from './dto/activation.dto';
import { LoginDto } from './dto/login.dto';
import { TokenConfig, TokenPayload } from '@/auth/types/jwt';
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

  private async createToken(
    payload: TokenPayload,
    config: TokenConfig,
  ): Promise<string> {
    return this.jwtService.sign(payload, config);
  }

  async register(registerDto: RegisterDto): Promise<IRegisterResponse> {
    const emailExists = await this.usersService.findOneByEmail(
      registerDto.email,
    );

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

    const existUser = await this.usersService.findOneByEmail(user.email);

    if (existUser) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });

    return {
      message: 'User activated',
    };
  }

  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const existUser = await this.usersService.findOneByEmail(loginDto.email);

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

    const payload = { sub: existUser._id.toString() };

    const accessToken = await this.createToken(payload, {
      secret: this.configService.get('jwt.access.secret'),
      expiresIn: this.configService.get('jwt.access.expiresIn'),
    });

    const refreshToken = await this.createToken(payload, {
      secret: this.configService.get('jwt.refresh.secret'),
      expiresIn: this.configService.get('jwt.refresh.expiresIn'),
    });

    await this.redisService.set(
      existUser._id.toString(),
      JSON.stringify(existUser),
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
