import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateBankDetailsDto {
  @ApiProperty({ example: 'Bank Of Kigali' })
  @Transform(lowerCaseTransformer)
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
