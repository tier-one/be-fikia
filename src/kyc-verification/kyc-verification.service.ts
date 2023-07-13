import { Injectable } from '@nestjs/common';
import { v4 as UUID } from 'uuid';
import { KycVerificationDto } from './Dto/kyc-verification.dto';
import * as smileIdentityCore from 'smile-identity-core';

@Injectable()
export class KycVerificationService {
  async verifyKyc(data: KycVerificationDto) {
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
        user_id: `user-${UUID()}`,
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

      const result = await connection.submit_job(
        partner_params,
        images,
        {},
        options,
      );

      return result;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}
