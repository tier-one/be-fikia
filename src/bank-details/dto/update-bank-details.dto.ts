import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateBankDetailsDto {
  @ApiProperty({ example: 'Bank Of Kigali' })
  @IsOptional()
  name: string | null;

  @ApiProperty({ example: 'Kigali Heights' })
  @IsOptional()
  branchName: string | null;

  @ApiProperty({ example: '2000431045033235' })
  @IsOptional()
  accountNumber: string | null;

  @ApiProperty({ example: 'BKRWRWRW' })
  @IsOptional()
  swiftCode?: string | null;
}
