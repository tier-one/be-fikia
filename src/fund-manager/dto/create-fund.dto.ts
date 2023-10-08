import { IsNotEmpty, IsString, IsNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateFundDto {
  @ApiProperty({ example: 'Sample Fund 1' })
  @IsNotEmpty()
  @IsString()
  fundName: string;

  @ApiProperty({ example: 'Equity Fund' })
  @IsNotEmpty()
  @IsString()
  fundType: string;

  @ApiProperty({ example: 'ABC Bank' })
  @IsNotEmpty()
  @IsString()
  custodian: string;

  @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  @Length(10, 10, { message: 'Account number must be 10 characters long' })
  accountNumber: string;

  @ApiProperty({
    example: 'This fund focuses on investing in technology stocks.',
  })
  @IsNotEmpty()
  @IsString()
  fundStrategy: string;

  @ApiProperty({ example: '1000.00' })
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Invalid investment minimum' },
  )
  investmentMinimum: number;

  @ApiProperty({ example: '1.50' })
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Invalid management fee' },
  )
  managementFee: number;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  initialValue: number;

  @ApiProperty({ example: '0.00' })
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Invalid fund liabilities' },
  )
  fundLiabilities: number;

  @ApiProperty({ example: '0.00' })
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Invalid share' },
  )
  sharesOutstanding: number;
}
