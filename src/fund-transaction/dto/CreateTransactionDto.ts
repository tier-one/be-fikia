import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  TransactionType,
  TransactionStatus,
} from '../entities/Transation.entity';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty({ example: TransactionType.BUY })
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @ApiProperty({ example: 'uuid' })
  @IsString()
  fundId: string;

  @ApiProperty({ example: 'uuid' })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'Investor Full Names',
    required: false,
  })
  @IsString()
  @IsOptional()
  investorFullNames?: string;

  @ApiProperty({ example: 1000.0 })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ example: 10.5 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: TransactionStatus.PENDING })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @ApiProperty({
    example: 'Some additional notes about the transaction',
    required: false,
  })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-01-01',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  tradeDate?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  broker?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  typeOfTransaction?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  typeOfInstrument?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  instrument?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  numberOfShares?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  commission?: number;
}
