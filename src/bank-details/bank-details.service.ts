import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankDetails } from './entities/bank-details.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateBankDetailsDto } from './dto/create-bank-details.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class BankDetailsService {
  constructor(
    @InjectRepository(BankDetails)
    private bankDetailsRepository: Repository<BankDetails>,
  ) {}

  create(createBankDetailsDto: CreateBankDetailsDto): Promise<BankDetails> {
    return this.bankDetailsRepository.save(
      this.bankDetailsRepository.create(createBankDetailsDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<BankDetails[]> {
    return this.bankDetailsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(
    fields: EntityCondition<BankDetails>,
  ): Promise<NullableType<BankDetails>> {
    return this.bankDetailsRepository.findOne({
      where: fields,
    });
  }

  update(id: string, payload: DeepPartial<BankDetails>): Promise<BankDetails> {
    return this.bankDetailsRepository.save(
      this.bankDetailsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.bankDetailsRepository.softDelete(id);
  }
}
