import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'String@12' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
    {
      message:
        'Password must contain at least one lowercase letter[a-z], one uppercase letter[A-Z], one digit[0-9], and one special character (@$!%*?&)',
    },
  )
  password: string;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  lastName: string;
}
