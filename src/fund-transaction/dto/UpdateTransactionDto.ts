import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType, TransactionStatus } from '../entities/Transation.entity';

export class UpdateTransactionDto {
  @ApiProperty({ example: TransactionType.SELL, required: false })
  @IsEnum(TransactionType)
  @IsOptional()
  transactionType?: TransactionType;

  @ApiProperty({ example: 1200.00, required: false })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ example: 11.00, required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: TransactionStatus.COMPLETED, required: false })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @ApiProperty({ example: 'Updated notes about the transaction', required: false })
  @IsString()
  @IsOptional()
  note?: string;

}
