import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionType } from '../enum/transaction-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  managerId: string;
  assetId: string;

  @ApiProperty({ example: '9697076d-df3e-493c-a6d4-cd2acfe5b699' })
  @IsString()
  @IsNotEmpty()
  userId: string;

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
