import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { RoleEnum } from 'src/roles/roles.enum';
// import { StatusEnum } from 'src/statuses/statuses.enum';
import { BankDetails } from 'src/bank-details/entities/bank-details.entity';
// import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankDetailsSeedService {
  constructor(
    @InjectRepository(BankDetails)
    private repository: Repository<BankDetails>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count();

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          name: 'Bank Of Kigali',
          branchName: 'Kigali',
          accountNumber: '2000431045033235',
          swiftCode: 'BKRWRWR',
        }),
      );
    }

    // const countUser = await this.repository.count({
    //   where: {
    //     role: {
    //       id: RoleEnum.user,
    //     },
    //   },
    // });

    //   if (!countUser) {
    //     await this.repository.save(
    //       this.repository.create({
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         email: 'john.doe@example.com',
    //         password: 'secret',
    //         role: {
    //           id: RoleEnum.user,
    //           name: 'Admin',
    //         },
    //         status: {
    //           id: StatusEnum.active,
    //           name: 'Active',
    //         },
    //       }),
    //     );
    //   }
  }
}
