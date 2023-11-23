import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  TransactionType,
  TransactionStatus,
} from '../entities/Transation.entity';

export class CreateTransactionDto {
  @ApiProperty({ example: TransactionType.BUY })
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @ApiProperty({
    example: 'Investor Full Names',
    required: false,
  })
  @IsString()
  @IsOptional()
  investorFullNames: string;

  @ApiProperty({ example: 1000.0 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 10.5 })
  @IsNumber()
  price: number;

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
}
