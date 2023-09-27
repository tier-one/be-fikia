import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  managerId: string;

  @ApiProperty({ example: '9697076d-df3e-493c-a6d4-cd2acfe5b699' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'Asset Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 100.5 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'This is a note', required: false })
  @IsString()
  @IsOptional()
  note?: string;
}
