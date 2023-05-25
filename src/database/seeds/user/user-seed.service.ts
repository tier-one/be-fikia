import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.admin,
        },
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          firstName: 'Super',
          lastName: 'Admin',
          middleName: '',
          email: 'admin@fikia.io',
          password: process.env.SUPER_ADMIN_PASS,

          role: {
            id: RoleEnum.admin,
            name: 'Admin',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }
  }
}
