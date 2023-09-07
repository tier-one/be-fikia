import { IsNotEmpty } from 'class-validator';

export class CreateKYCResultDto {
  @IsNotEmpty()
  jobId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  jobResult: string;

  @IsNotEmpty()
  jobSuccess: boolean;

  @IsNotEmpty()
  jobComplete: boolean;

  @IsNotEmpty()
  timestamp: string;
}
