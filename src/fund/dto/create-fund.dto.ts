import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class DepositoryAccount {
  @ApiProperty({ example: 'Account Depository Bank Name' })
  @IsOptional()
  @IsString()
  AccoutDepositoryBankName: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsString()
  AccountDepositoryAccountNumber: string;

  @ApiProperty({ example: 'USD' })
  @IsOptional()
  @IsString()
  DespositoryAccountCurrency: string;
}

class CashAccount {
  @ApiProperty({ example: 'Cash Account Bank Name' })
  @IsOptional()
  @IsString()
  CashAccountBankName: string;

  @ApiProperty({ example: '9876543210' })
  @IsOptional()
  @IsString()
  CashAccountNumber: string;

  @ApiProperty({ example: 'USD' })
  @IsOptional()
  @IsString()
  CashAccountCurrency: string;
}
export class CreateFundDto {
  @ApiProperty({ example: 'Sample Fund 1' })
  @IsNotEmpty()
  @IsString()
  FundName: string;

  @ApiProperty({ example: 'Fund Goal' })
  @IsNotEmpty()
  @IsString()
  FundGoal: string;

  @ApiProperty({ example: 'FUND' })
  @IsNotEmpty()
  @IsString()
  FundSymbol: string;

  @ApiProperty({ example: 'Equity Fund' })
  @IsNotEmpty()
  @IsString()
  FundType: string;

  @ApiProperty({ example: 'Fund-logo.png' })
  @IsNotEmpty()
  @IsString()
  FundLogo: string;

  @ApiProperty({ type: [DepositoryAccount] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DepositoryAccount)
  DepositoryAccounts: DepositoryAccount[];

  @ApiProperty({ type: [CashAccount] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CashAccount)
  CashAccounts: CashAccount[];

  @ApiProperty({ example: 'Custodian Bank Name' })
  @IsNotEmpty()
  @IsString()
  CustodianBankName: string;

  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  @IsNumber()
  CustodianParcentage: number;

  @ApiProperty({ example: 'Trust Bank Name' })
  @IsNotEmpty()
  @IsString()
  TrustBankName: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  TrustPercentage: number;
}
