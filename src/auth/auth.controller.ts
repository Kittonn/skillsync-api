import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import {
  IActivateUserResponse,
  ILoginResponse,
  IRegisterResponse,
} from '@/auth/types/auth';
import { ActivationDto } from './dto/activation.dto';
import { LoginDto } from './dto/login.dto';

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
}
