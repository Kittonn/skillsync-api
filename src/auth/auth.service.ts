import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@/users/schema/user.schema';
import { ICreateActivationToken } from '@/shared/types/auth';
import { NodeMailerService } from '@/node-mailer/node-mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly nodeMailerService: NodeMailerService,
  ) {}

  async register(registerDto: RegisterDto) {
    const emailExists = await this.usersService.findOneByEmail(
      registerDto.email,
    );

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    const { token, activationCode } = await this.createActivationToken(
      registerDto as User,
    );

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
      message: `Activation email sent to ${registerDto.email}`,
      activationToken: token,
    };
  }

  async createActivationToken(user: User): Promise<ICreateActivationToken> {
    const activationCode = Math.floor(1000 + Math.random() * 9000);

    const payload = { activationCode, user };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('activation.secret'),
      expiresIn: this.configService.get('activation.expiresIn'),
    });

    return { token, activationCode };
  }
}
