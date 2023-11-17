import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUUID,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 'UUID of the user' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'UUID of the asset' })
  @IsNotEmpty()
  @IsUUID()
  assetId: string;

  @ApiProperty({ example: 'subscription' })
  @IsNotEmpty()
  @IsString()
  transactionType: string;

  @ApiProperty({ example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'completed' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsNotEmpty()
  @IsDate()
  transactionDate: Date;

  @ApiProperty({
    example: 'Additional note for the transaction',
    required: false,
  })
  @IsString()
  note?: string;
}
