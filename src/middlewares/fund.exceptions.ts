import { HttpException, HttpStatus } from '@nestjs/common';

export class ManagerNotFoundException extends HttpException {
  constructor(managerId: string) {
    super(`Manager with ID ${managerId} not found`, HttpStatus.BAD_REQUEST);
  }
}

export class InvestorNotFoundException extends HttpException {
  constructor(investorId: string) {
    super(`Investor with ID ${investorId} not found`, HttpStatus.BAD_REQUEST);
  }
}

export class FundAlreadyExistsException extends HttpException {
  constructor(fundName: string) {
    super(`Fund with name ${fundName} already exists`, HttpStatus.BAD_REQUEST);
  }
}

export class FundNotFoundException extends HttpException {
  constructor(fundId: string) {
    super(`Fund with ID ${fundId} not found`, HttpStatus.NOT_FOUND);
  }
}
