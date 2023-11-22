import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType, TransactionStatus } from '../entities/Transation.entity';

export class CreateTransactionDto {
  @ApiProperty({ example: TransactionType.BUY })
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @ApiProperty({ example: 1000.00 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 10.50 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: TransactionStatus.PENDING })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @ApiProperty({ example: 'Some additional notes about the transaction', required: false })
  @IsString()
  @IsOptional()
  note?: string;
}
