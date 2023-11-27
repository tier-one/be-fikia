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

export class UpdateTransactionDto {
  @ApiProperty({ example: TransactionType.SELL, required: false })
  @IsEnum(TransactionType)
  @IsOptional()
  transactionType?: TransactionType;

  @ApiProperty({ type: Date, example: '2023-01-02', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  tradeDate?: Date;

  @ApiProperty({ example: 'New Broker Name', required: false })
  @IsString()
  @IsOptional()
  broker?: string;

  @ApiProperty({ example: 'New Instrument Type', required: false })
  @IsString()
  @IsOptional()
  typeOfInstrument?: string;

  @ApiProperty({ example: 'New Instrument Name', required: false })
  @IsString()
  @IsOptional()
  instrument?: string;

  @ApiProperty({ example: 150, required: false })
  @IsNumber()
  @IsOptional()
  numberOfShares?: number;

  @ApiProperty({ example: 55.0, required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 6.0, required: false })
  @IsNumber()
  @IsOptional()
  commission?: number;

  @ApiProperty({ example: TransactionStatus.COMPLETED, required: false })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;
}
