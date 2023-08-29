import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial, Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';

@Injectable()
export class UserActivityService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Activity)
    private userActivityRepository: Repository<Activity>,
  ) {}

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  update(id: string, payload: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async loginActivity(userId: string, success: boolean): Promise<void> {
    const lastActivity = await this.userActivityRepository.findOne({
      where: { userId },
      order: { timestamp: 'DESC' },
    });

    const newActivity = new Activity();
    newActivity.userId = userId;
    newActivity.activityType = success ? 'SUCCESS' : 'FAILURE';

    if (lastActivity) {
      if (
        lastActivity.activityType === 'FAILURE' &&
        newActivity.activityType === 'FAILURE'
      ) {
        newActivity.loginAttempts = lastActivity.loginAttempts + 1;
      } else {
        newActivity.loginAttempts = 1;
      }
    } else {
      newActivity.loginAttempts = 1;
    }

    await this.userActivityRepository.save(newActivity);
  }

  async getUserActivities(userId: string): Promise<Activity[]> {
    const userActivities = await this.userActivityRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
    });

    return userActivities;
  }
}
