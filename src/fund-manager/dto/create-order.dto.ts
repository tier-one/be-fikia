import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderType } from '../enums/order-type.enum';
import { OrderStatus } from '../enums/order-status.enum';

export class CreateOrderDto {
  @ApiProperty({ example: 'buy' })
  @IsEnum(OrderType)
  orderType: OrderType;

  @ApiProperty({ example: 'pending' })
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @ApiProperty({ example: 100 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 200.5 })
  @IsNumber()
  price: number;
}
