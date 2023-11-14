import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import {
  IActivateUserResponse,
  ILoginResponse,
  ILogoutResponse,
  IRegisterResponse,
} from '@/auth/types/auth';
import { ActivationDto } from './dto/activation.dto';
import { LoginDto } from './dto/login.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { UserDocument } from '@/users/schema/user.schema';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { RefreshTokenGuard } from '@/common/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<IRegisterResponse> {
    return this.authService.register(registerDto);
  }

  @Post('activate')
  async activate(
    @Body() activationDto: ActivationDto,
  ): Promise<IActivateUserResponse> {
    return this.authService.activate(activationDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ILoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  async logout(@GetUser('_id') userId: string): Promise<ILogoutResponse> {
    return this.authService.logout(userId);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@GetUser('_id') userId: string) {
    return this.authService.refresh(userId);
  }
}
