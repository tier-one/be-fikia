import {
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionDto {
  @ApiProperty({ example: 'UUID of the user', required: false })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ example: 'UUID of the asset', required: false })
  @IsOptional()
  @IsUUID()
  assetId?: string;

  @ApiProperty({ example: 'subscription', required: false })
  @IsOptional()
  @IsString()
  transactionType?: string;

  @ApiProperty({ example: 1000, required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ example: 'completed', required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', required: false })
  @IsOptional()
  @IsDate()
  transactionDate?: Date;

  @ApiProperty({
    example: 'Additional note for the transaction',
    required: false,
  })
  @IsOptional()
  @IsString()
  note?: string;
}
