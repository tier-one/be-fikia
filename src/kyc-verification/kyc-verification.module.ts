import { Module } from '@nestjs/common';
import { KycVerificationService } from './kyc-verification.service';
import { KycVerificationController } from './kyc-verification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KYCResult } from './Entities/KYCResult.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KYCResult])],
  providers: [KycVerificationService],
  controllers: [KycVerificationController],
})
export class KycVerificationModule {}
