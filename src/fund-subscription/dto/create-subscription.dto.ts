import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 7000 })
  @IsNotEmpty()
  @IsNumber()
  amountInvested: number;
}
