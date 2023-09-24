import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { KycVerificationDto } from './Dto/kyc-verification.dto';
import { KycVerificationService } from './kyc-verification.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { KycUpdateDto } from './Dto/kyc-update.dto';

@ApiBearerAuth()
@ApiTags('Kyc Verification')
@Controller('kyc-verification')
export class KycVerificationController {
  constructor(private readonly kycService: KycVerificationService) {}

  @Post(':userId')
  async userKycVerification(
    @Param('userId') userId: string,
    @Body() data: KycVerificationDto,
  ) {
    try {
      const result = await this.kycService.verifyKyc(userId, data);
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Put(':userId/:jobId')
  async updateKyc(
    @Param('jobId') jobId: string,
    @Param('userId') userId: string,
    @Body() data: KycUpdateDto,
  ) {
    try {
      const updatedKyc = await this.kycService.updateKyc(userId, jobId, data);
      return { success: true, updatedKyc };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
