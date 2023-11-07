import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class EquityDetailsDto {
  @ApiProperty({ example: 'BOK', required: false })
  @IsString()
  @IsOptional()
  tickerSymbol?: string;

  @ApiProperty({ example: 'BK Group Plc', required: false })
  @IsString()
  @IsOptional()
  companyName?: string;

  @ApiProperty({ example: 1000000, required: false })
  @IsNumber()
  @IsOptional()
  numberOfOutstandingShares?: number;
}

class FixedIncomeDetailsDto {
  @ApiProperty({ example: 'Government Bond', required: false })
  @IsString()
  @IsOptional()
  bondType?: string;

  @ApiProperty({ example: 'Government of Rwanda', required: false })
  @IsString()
  @IsOptional()
  issuer?: string;

  @ApiProperty({ example: 1000.5, required: false })
  @IsNumber()
  @IsOptional()
  faceValue?: number;

  @ApiProperty({ example: '2023-12-31', required: false })
  @IsString()
  @IsOptional()
  maturityDate?: string;

  @ApiProperty({ example: 5.5, required: false })
  @IsNumber()
  @IsOptional()
  couponRate?: number;

  @ApiProperty({ example: 'Annually', required: false })
  @IsString()
  @IsOptional()
  paymentFrequency?: string;

  @ApiProperty({ example: 5.5, required: false })
  @IsNumber()
  @IsOptional()
  yieldToMaturity?: number;

  @ApiProperty({ example: 'AAA', required: false })
  @IsString()
  @IsOptional()
  creditRating?: string;
}

class RealEstateDetailsDto {
  @ApiProperty({ example: '123 Main St, Kigali, Rwanda', required: false })
  @IsString()
  @IsOptional()
  propertyAddress?: string;

  @ApiProperty({ example: 'Residential', required: false })
  @IsString()
  @IsOptional()
  propertyType?: string;

  @ApiProperty({ example: 1000.5, required: false })
  @IsNumber()
  @IsOptional()
  rentalIncome?: number;
}

class AlternativeInvestmentDetailsDto {
  @ApiProperty({ example: 'Investment Fund Name', required: false })
  @IsString()
  @IsOptional()
  investmentFundName?: string;

  @ApiProperty({ example: 'Investment Manager', required: false })
  @IsString()
  @IsOptional()
  investmentManager?: string;

  @ApiProperty({ example: 'Fund Strategy', required: false })
  @IsString()
  @IsOptional()
  fundStrategy?: string;
}

export class UpdateAssetDto {
  @ApiProperty({ example: 'Asset Name' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 100.5 })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiProperty({ example: 'This is a note', required: false })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ type: EquityDetailsDto, required: false })
  @IsOptional()
  equityDetails?: EquityDetailsDto;

  @ApiProperty({ type: FixedIncomeDetailsDto, required: false })
  @IsOptional()
  fixedIncomeDetails?: FixedIncomeDetailsDto;

  @ApiProperty({ type: RealEstateDetailsDto, required: false })
  @IsOptional()
  realEstateDetails?: RealEstateDetailsDto;

  @ApiProperty({ type: AlternativeInvestmentDetailsDto, required: false })
  @IsOptional()
  alternativeInvestmentDetails?: AlternativeInvestmentDetailsDto;
}