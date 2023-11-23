import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { RoleEnum } from 'src/roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import * as crypto from 'crypto';
import { plainToClass } from 'class-transformer';
import { Status } from 'src/statuses/entities/status.entity';
import { Role } from 'src/roles/entities/role.entity';
import { AuthProvidersEnum } from './auth-providers.enum';
import { SocialInterface } from 'src/social/interfaces/social.interface';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UsersService } from 'src/users/users.service';
import { ForgotService } from 'src/forgot/forgot.service';
import { MailService } from 'src/mail/mail.service';
import { NullableType } from '../utils/types/nullable.type';
import {
  LoginResponseType,
  LoginResponseType2,
} from '../utils/types/auth/login-response.type';
import { GoogleCreateUserDto } from './dto/google-create-user.dto';
import { UserActivityService } from 'src/activity/user-activity.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private forgotService: ForgotService,
    private mailService: MailService,
    private userActivityService: UserActivityService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<LoginResponseType2> {
    const returnedUser = await this.usersService.findOne({
      email: loginDto.email,
    });

    if (
      !returnedUser ||
      (returnedUser?.role &&
        !(onlyAdmin ? [RoleEnum.admin] : [RoleEnum.user]).includes(
          returnedUser.role.id,
        ))
    ) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (returnedUser.provider !== AuthProvidersEnum.email) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: `needLoginViaProvider:${returnedUser.provider}`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!returnedUser.status || returnedUser.status.id !== StatusEnum.active) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          errors: {
            email: 'emailNotConfirmed',
          },
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      returnedUser.password,
    );

    if (!isValidPassword) {
      await this.userActivityService.loginActivity(returnedUser.id, false);
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.userActivityService.loginActivity(returnedUser.id, true);

    const token = this.jwtService.sign({
      id: returnedUser.id,
      role: returnedUser.role,
    });

    const user = {
      ...returnedUser,
      token,
    };

    return { user };
  }

  async validateManagerLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<LoginResponseType2> {
    const returnedUser = await this.usersService.findOne({
      email: loginDto.email,
    });

    if (
      !returnedUser ||
      (returnedUser?.role &&
        !(onlyAdmin ? [RoleEnum.admin] : [RoleEnum.manager]).includes(
          returnedUser.role.id,
        ))
    ) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (returnedUser.provider !== AuthProvidersEnum.email) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: `needLoginViaProvider:${returnedUser.provider}`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!returnedUser.status || returnedUser.status.id !== StatusEnum.active) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          errors: {
            email: 'emailNotConfirmed',
          },
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      returnedUser.password,
    );

    if (!isValidPassword) {
      await this.userActivityService.loginActivity(returnedUser.id, false);
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.userActivityService.loginActivity(returnedUser.id, true);

    const token = this.jwtService.sign({
      id: returnedUser.id,
      role: returnedUser.role,
    });

    const user = {
      ...returnedUser,
      token,
    };

    return { user };
  }

  async validateSocialLogin(
    authProvider: string,
    socialData: SocialInterface,
  ): Promise<LoginResponseType> {
    let user: NullableType<User>;
    const socialEmail = socialData.email?.toLowerCase();

    const userByEmail = await this.usersService.findOne({
      email: socialEmail,
    });

    user = await this.usersService.findOne({
      socialId: socialData.id,
      provider: authProvider,
    });

    if (user) {
      if (socialEmail && !userByEmail) {
        user.email = socialEmail;
      }
      await this.usersService.update(user.id, user);
    } else if (userByEmail) {
      user = userByEmail;
    } else {
      const role = plainToClass(Role, {
        id: RoleEnum.user,
      });
      const status = plainToClass(Status, {
        id: StatusEnum.active,
      });

      user = await this.usersService.create({
        email: socialEmail ?? null,
        firstName: socialData.firstName ?? null,
        lastName: socialData.lastName ?? null,
        socialId: socialData.id,
        provider: authProvider,
        role,
        status,
      });

      user = await this.usersService.findOne({
        id: user.id,
      });
    }

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'userNotFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const jwtToken = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return {
      token: jwtToken,
      user,
    };
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    try {
      await this.usersService.create({
        ...dto,
        email: dto.email,
        role: {
          id: RoleEnum.user,
        } as Role,
        status: {
          id: StatusEnum.inactive,
        } as Status,
        hash,
      });

      try {
        await this.mailService.userSignUp({
          to: dto.email,
          data: {
            hash,
          },
        });
      } catch (error) {
        if (error.code === 'EAUTH') {
          throw new Error(
            'Email service credentials are not properly configured.',
          );
        } else {
          throw new Error('Failed to send the confirmation email.');
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async ManagerRegister(dto: AuthRegisterLoginDto): Promise<void> {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    try {
      await this.usersService.create({
        ...dto,
        email: dto.email,
        role: {
          id: RoleEnum.manager,
        } as Role,
        status: {
          id: StatusEnum.inactive,
        } as Status,
        hash,
      });

      try {
        await this.mailService.userSignUp({
          to: dto.email,
          data: {
            hash,
          },
        });
      } catch (error) {
        if (error.code === 'EAUTH') {
          throw new Error(
            'Email service credentials are not properly configured.',
          );
        } else {
          throw new Error('Failed to send the confirmation email.');
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.usersService.findOne({
      hash,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    user.hash = null;
    user.status = plainToClass(Status, {
      id: StatusEnum.active,
    });
    await user.save();
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findOne({
      email,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailNotExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    await this.forgotService.create({
      hash,
      user,
    });

    await this.mailService.forgotPassword({
      to: email,
      data: {
        hash,
      },
    });
  }

  async resetPassword(hash: string, password: string): Promise<void> {
    const forgot = await this.forgotService.findOne({
      where: {
        hash,
      },
    });

    if (!forgot) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `notFound`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = forgot.user;
    user.password = password;

    await user.save();
    await this.forgotService.softDelete(forgot.id);
  }

  async me(user: User): Promise<NullableType<User>> {
    return this.usersService.findOne({
      id: user.id,
    });
  }

  async update(
    user: User,
    userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    if (userDto.password) {
      if (userDto.oldPassword) {
        const currentUser = await this.usersService.findOne({
          id: user.id,
        });

        if (!currentUser) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                user: 'userNotFound',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        const isValidOldPassword = await bcrypt.compare(
          userDto.oldPassword,
          currentUser.password,
        );

        if (!isValidOldPassword) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                oldPassword: 'incorrectOldPassword',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              oldPassword: 'missingOldPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    await this.usersService.update(user.id, userDto);

    return this.usersService.findOne({
      id: user.id,
    });
  }

  async softDelete(user: User): Promise<void> {
    await this.usersService.softDelete(user.id);
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.usersService.findOne({ id: userId });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: {
            currentPassword: 'Incorrect current password',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    user.password = newPassword;

    await user.save();
  }

  async googleSignupAndLogin(dto: GoogleCreateUserDto): Promise<User> {
    return await this.usersService.googleCreate(dto);
  }


}
