import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 'buy' })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({ example: 100 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 200.5 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'This is a sample note', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
