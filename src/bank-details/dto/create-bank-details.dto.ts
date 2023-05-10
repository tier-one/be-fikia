import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBankDetailsDto {
  @ApiProperty({ example: 'Bank Of Kigali' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Kigali Heights' })
  @IsNotEmpty()
  branchName: string;

  @ApiProperty({ example: '2000431045033235' })
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({ example: 'BKRWRWRW' })
  @IsNotEmpty()
  swiftCode: string;
}
