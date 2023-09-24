import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class KycUpdateDto {
  @IsString()
  @IsOptional()
  jobResult: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  jobSuccess: boolean;

  @IsOptional()
  @IsBoolean()
  jobComplete: boolean;
}
