import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSubscriptionDto {
  @ApiProperty({ example: 7000 })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  amountInvested?: number;
}
