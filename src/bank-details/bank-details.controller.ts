import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { BankDetailsService } from './bank-details.service';
import { BankDetails } from './entities/bank-details.entity';
import { CreateBankDetailsDto } from './dto/create-bank-details.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Users')
@Controller({
  path: 'bank-details',
  version: '1',
})
export class BankDetailsController {
  constructor(private readonly bankDetailsService: BankDetailsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createBankDetailsDto: CreateBankDetailsDto,
  ): Promise<BankDetails> {
    return this.bankDetailsService.create(createBankDetailsDto);
  }
}
