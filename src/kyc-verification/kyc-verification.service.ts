import { Injectable } from '@nestjs/common';
import { v4 as UUID } from 'uuid';
import { KycVerificationDto } from './Dto/kyc-verification.dto';
import * as smileIdentityCore from 'smile-identity-core';
import { InjectRepository } from '@nestjs/typeorm';
import { KYCResult } from './Entities/KYCResult.entity';
import { Repository } from 'typeorm';
import { KycUpdateDto } from './Dto/kyc-update.dto';

interface KycVerificationResult {
  code: string;
  job_complete: boolean;
  job_success: boolean;
  signature: string;
  timestamp: string;
  result: {
    Source: string;
    Actions: {
      [key: string]: string;
    };
    ResultCode: string;
    ResultText: string;
    ResultType: string;
    SmileJobID: string;
    IsFinalResult: string;
    PartnerParams: {
      job_id: string;
      user_id: string;
      job_type: number;
      libraryVersion: string;
    };
    ConfidenceValue: string;
  };
}

@Injectable()
export class KycVerificationService {
  constructor(
    @InjectRepository(KYCResult)
    private kycResultsRepository: Repository<KYCResult>,
  ) {}

  async verifyKyc(userId: string, data: KycVerificationDto) {
    try {
      const { WebApi } = smileIdentityCore;

      const PARTNER_ID = process.env.PARTNER_ID as string;
      const API_KEY = process.env.API_KEY as string;
      const SID_SERVER = process.env.SID_SERVER as string;
      const CALLBACK_URL = process.env.DEFAULT_CALLBACK as string;

      const connection = new WebApi(
        PARTNER_ID,
        CALLBACK_URL,
        API_KEY,
        SID_SERVER,
      );

      const getJobType = (images) => {
        const hasIDImage =
          images.filter((image) => image.image_type_id === 3).length > 0;

        return hasIDImage ? 1 : 4;
      };

      const images = data.images;
      const libraryVersion = data.partner_params.libraryVersion;

      const partner_params_from_server = {
        user_id: userId,
        job_id: `job-${UUID()}`,
        job_type: getJobType(images),
      };

      const options = {
        return_job_status: true,
        signature: true,
      };

      const partner_params = Object.assign({}, partner_params_from_server, {
        libraryVersion,
      });

      const result = (await connection.submit_job(
        partner_params,
        images,
        {},
        options,
      )) as KycVerificationResult;

      const datas = {
        jobId: result?.result?.PartnerParams?.job_id,
        userId: result?.result?.PartnerParams?.user_id,
        jobResult: result?.result?.ResultText,
        jobSuccess: result?.job_success,
        jobComplete: result?.job_complete,
        timestamp: result?.timestamp,
      };

      const kycSaved = this.kycResultsRepository.create(datas);
      await this.kycResultsRepository.save(kycSaved);

      return result;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async updateKyc(userId: string, jobId: string, data: KycUpdateDto) {
    try {
      const existingKyc = await this.kycResultsRepository.findOne({
        where: { userId, jobId },
      });

      if (!existingKyc) {
        throw new Error('KYC record not found');
      }

      console.log('Existing KYC before update:', existingKyc); // Log before update
      console.log(data.jobSuccess + ' ' + 'THIS IS DATA');
      // Update the existing KYC record with the new data
      existingKyc.jobResult = data.jobResult;
      existingKyc.jobSuccess = data.jobSuccess;
      existingKyc.jobComplete = data.jobComplete;

      console.log('Existing KYC after update:', existingKyc); // Log after update

      // Save the updated KYC record
      await this.kycResultsRepository.save(existingKyc);

      return existingKyc;
    } catch (e) {
      console.error(e);
      throw e; // Rethrow the error for handling in the controller
    }
  }
}
