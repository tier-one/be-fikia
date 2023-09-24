import { IsArray, IsObject } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class KycVerificationDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsArray()
  images: any[];

  @IsObject()
  partner_params: {
    libraryVersion: string;
  };
}
