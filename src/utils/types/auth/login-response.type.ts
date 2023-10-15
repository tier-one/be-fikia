import { User } from '../../../users/entities/user.entity';

export type LoginResponseType = Readonly<{
  token: string;
  user: User;
}>;

export type LoginResponseType2 = Readonly<{
  user: any;
}>;
