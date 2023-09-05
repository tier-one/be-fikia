import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto {
  managerId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  note?: string;
}
