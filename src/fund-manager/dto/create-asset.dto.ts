import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @ApiProperty({ example: 'Asset Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 100.5 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiProperty({ example: 'This is a note', required: false })
  @IsString()
  @IsOptional()
  note?: string;
}
