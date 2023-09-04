import { Controller, Post, Body } from '@nestjs/common';
import { KycVerificationDto } from './Dto/kyc-verification.dto';
import { KycVerificationService } from './kyc-verification.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Kyc Verification')
@Controller('kyc-verification')
export class KycVerificationController {
  constructor(private readonly kycService: KycVerificationService) {}

  @Post()
  async userKycVerification(@Body() data: KycVerificationDto) {
    try {
      const result = await this.kycService.verifyKyc(data);
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('callback')
  handleCallback(@Body() callbackData: any) {
    try {
      console.info('webhook', callbackData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
