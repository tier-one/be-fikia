import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { FundManagerService } from './fund-manager.service';
import { CreateFundManagerDto } from './dto/create-fund-manager.dto';
import { EmailRegisterCustomErrorHandler } from 'src/utils/errorsHandler/emailRegisterCustomErrorHandler';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Fund Manager')
@Controller({
  path: 'fund-manager',
  version: '1',
})
export class FundManagerController {
  constructor(private readonly fundManagerService: FundManagerService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateFundManagerDto,
  ): Promise<{ status: HttpStatus; message: string }> {
    try {
      await this.fundManagerService.register(createUserDto);

      return {
        status: HttpStatus.CREATED,
        message: 'Account created, Check your email to confirm',
      };
    } catch (error) {
      return EmailRegisterCustomErrorHandler.handle(error);
    }
  }
}
