import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseType } from '../utils/types/auth/login-response.type';
import { User } from '../users/entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { AuthChangePasswordDto } from './dto/auth-change-password.dto';
import { EmailRegisterCustomErrorHandler } from 'src/utils/errorsHandler/emailRegisterCustomErrorHandler';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<LoginResponseType> {
    return this.service.validateLogin(loginDto, false);
  }

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('admin/email/login')
  @HttpCode(HttpStatus.OK)
  public adminLogin(
    @Body() loginDTO: AuthEmailLoginDto,
  ): Promise<LoginResponseType> {
    return this.service.validateLogin(loginDTO, true);
  }

  @Post('email/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: AuthRegisterLoginDto,
  ): Promise<{ status: HttpStatus; message: string }> {
    try {
      await this.service.register(createUserDto);

      return {
        status: HttpStatus.CREATED,
        message: 'Account created, Check your email to confirm',
      };
    } catch (error) {
      return EmailRegisterCustomErrorHandler.handle(error);
    }
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(
    @Body() confirmEmailDto: AuthConfirmEmailDto,
  ): Promise<{ status: HttpStatus; message: string }> {
    await this.service.confirmEmail(confirmEmailDto.hash);

    return {
      status: HttpStatus.OK,
      message: 'Your email has been successfully verified. You can now log in.',
    };
  }

  @Post('forgot/password')
  @HttpCode(HttpStatus.ACCEPTED)
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<{ status: HttpStatus; message: string }> {
    await this.service.forgotPassword(forgotPasswordDto.email);

    return {
      status: HttpStatus.ACCEPTED,
      message: 'Link to reset your password has been sent your email',
    };
  }

  @Post('reset/password')
  async resetPassword(
    @Body() resetPasswordDto: AuthResetPasswordDto,
  ): Promise<{ status: HttpStatus; message: string }> {
    await this.service.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    );

    return {
      status: HttpStatus.ACCEPTED,
      message: 'Your Password has been reset successfully',
    };
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(@Request() request): Promise<NullableType<User>> {
    return this.service.me(request.user);
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public update(
    @Request() request,
    @Body() userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return this.service.update(request.user, userDto);
  }

  @ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Request() request): Promise<void> {
    return this.service.softDelete(request.user);
  }

  @Patch('/change-password/:id')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Request() request,
    @Param('id') userId: string,
    @Body() changePasswordDto: AuthChangePasswordDto,
  ): Promise<{ status: HttpStatus; message: string }> {
    await this.service.changePassword(
      userId,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
    );
    return {
      status: HttpStatus.OK,
      message: 'Password changed successfully',
    };
  }
}
