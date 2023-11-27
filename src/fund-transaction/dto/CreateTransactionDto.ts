import { IsEnum, IsNumber, IsString, IsDate } from 'class-validator';
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

  @ApiProperty({ type: Date, example: '2023-01-01' })
  @IsDate()
  @Type(() => Date)
  tradeDate: Date;

  @ApiProperty({ example: 'Broker Name' })
  @IsString()
  broker: string;

  @ApiProperty({ example: 'Instrument Type' })
  @IsString()
  typeOfInstrument: string;

  @ApiProperty({ example: 'Instrument Name' })
  @IsString()
  instrument: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  numberOfShares: number;

  @ApiProperty({ example: 50.0 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 5.0 })
  @IsNumber()
  commission: number;

  @ApiProperty({ example: TransactionStatus.PENDING })
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
