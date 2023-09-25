import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { BankDetails } from '../../bank-details/entities/bank-details.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  middleName?: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ example: '' })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  dateOfBirth?: string | null;

  @ApiProperty({ example: '' })
  @IsOptional()
  phoneNumber?: string | null;

  @ApiProperty({ example: '' })
  @IsOptional()
  governmentId?: string | null;

  @ApiProperty({ example: '' })
  @IsOptional()
  governmentIdImage?: string | null;

  @ApiProperty({ example: '' })
  @IsOptional()
  firstApplicantSignatureImage?: string | null;

  @ApiProperty({ example: '' })
  @IsOptional()
  nextOfKeenImage?: string | null;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  residence?: string | null;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  occupation?: string | null;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  sourceOfFunds?: string | null;

  @ApiProperty({ type: BankDetails })
  @IsNotEmpty()
  bankDetails?: BankDetails;

  @ApiProperty({ type: Role })
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  hash?: string | null;
}
