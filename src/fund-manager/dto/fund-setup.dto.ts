import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFundSetupDto {
  @ApiProperty({ example: 'Account Depository Bank Name' })
  @IsNotEmpty()
  @IsString()
  AccoutDepositoryBankName: string;

  @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  AccountDepositoryAccountNumber: string;

  @ApiProperty({ example: 'Cash Account Bank Name' })
  @IsNotEmpty()
  @IsString()
  CashAccountBankName: string;

  @ApiProperty({ example: '9876543210' })
  @IsNotEmpty()
  @IsString()
  CashAccountNumber: string;

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

  @ApiProperty({ example: 'Sample Fund 1' })
  @IsNotEmpty()
  @IsString()
  fundName: string;

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
  fundType: string;

  @ApiProperty({ example: 'fund-logo.png' })
  @IsNotEmpty()
  @IsString()
  fundLogo: string;
}
