import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderType } from '../enum/order-type.enum';
import { OrderStatus } from '../enum/order-status.enum';

export class CreateOrderDto {
  @ApiProperty({ example: 'BUY' })
  @IsEnum(OrderType)
  orderType: OrderType;

  @ApiProperty({ example: 'PENDING' })
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @ApiProperty({ example: 100 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 200.5 })
  @IsNumber()
  price: number;
}
