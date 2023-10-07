import { IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  investorId: string;

  @IsNotEmpty()
  fundId: string;
}
