import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFundDto {
  @ApiProperty({ example: 'Sample Fund 1' })
  @IsOptional()
  @IsString()
  FundName: string;

  @ApiProperty({ example: 'Fund Goal' })
  @IsOptional()
  @IsString()
  FundGoal: string;

  @ApiProperty({ example: 'FUND' })
  @IsOptional()
  @IsString()
  FundSymbol: string;

  @ApiProperty({ example: 'Equity Fund' })
  @IsOptional()
  @IsString()
  FundType: string;

  @ApiProperty({ example: 'Fund-logo.png' })
  @IsOptional()
  @IsString()
  FundLogo: string;

  @ApiProperty({ example: 'Account Depository Bank Name' })
  @IsOptional()
  @IsString()
  AccoutDepositoryBankName: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  AccountDepositoryAccountNumber: string;

  @ApiProperty({ example: 'Cash Account Bank Name' })
  @IsOptional()
  @IsString()
  CashAccountBankName: string;

  @ApiProperty({ example: '9876543210' })
  @IsOptional()
  @IsString()
  CashAccountNumber: string;

  @ApiProperty({ example: 'Custodian Bank Name' })
  @IsOptional()
  @IsString()
  CustodianBankName: string;

  @ApiProperty({ example: 5 })
  @IsOptional()
  @IsNumber()
  CustodianParcentage: number;

  @ApiProperty({ example: 'Trust Bank Name' })
  @IsOptional()
  @IsString()
  TrustBankName: string;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsNumber()
  TrustPercentage: number;
}
