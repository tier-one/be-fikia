import { Module } from '@nestjs/common';
import { BankDetailsService } from './bank-details.service';
import { BankDetailsController } from './bank-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankDetails } from './entities/bank-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankDetails])],
  providers: [BankDetailsService],
  controllers: [BankDetailsController],
  exports: [BankDetailsService],
})
export class BankDetailsModule {}
