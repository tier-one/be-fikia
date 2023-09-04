import { IsArray, IsObject } from 'class-validator';

export class KycVerificationDto {
  @IsArray()
  images: any[];

  @IsObject()
  partner_params: {
    libraryVersion: string;
  };
}
