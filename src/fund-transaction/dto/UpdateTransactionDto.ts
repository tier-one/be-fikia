import { IsEnum, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType, TransactionStatus } from '../entities/Transation.entity';

export class UpdateTransactionDto {
  @ApiProperty({ example: TransactionType.SELL, required: false })
  @IsEnum(TransactionType)
  @IsOptional()
  transactionType?: TransactionType;

  @ApiProperty({
    example: 'Investor Full Names',
    required: false,
  })
  @IsString()
  @IsOptional()
  investorFullNames?: string;

  @ApiProperty({ example: 1200.0, required: false })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ example: 11.0, required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: TransactionStatus.COMPLETED, required: false })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @ApiProperty({
    example: 'Updated notes about the transaction',
    required: false,
  })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ type: Date, required: false }) 
  @IsDate()
  @IsOptional()
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
