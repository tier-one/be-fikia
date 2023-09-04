import { Module } from '@nestjs/common';
import { KycVerificationService } from './kyc-verification.service';
import { KycVerificationController } from './kyc-verification.controller';

@Module({
  providers: [KycVerificationService],
  controllers: [KycVerificationController],
})
export class KycVerificationModule {}
