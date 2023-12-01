import { HttpException, HttpStatus } from '@nestjs/common';

export class ManagerNotFoundException extends HttpException {
  constructor(managerId: string) {
    super(`Manager with ID ${managerId} not found`, HttpStatus.BAD_REQUEST);
  }
}

export class ManagerDoesNotHaveFundException extends HttpException {
  constructor(managerId: string, fundId: string) {
    super(
      `The fund with this Id [ ${fundId} ] do not belong to the Manager with this ID [${managerId}]`,
      HttpStatus.BAD_REQUEST,
    );
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
export class AssetNotFoundException extends HttpException {
  constructor(assetId: string) {
    super(`asset with ID ${assetId} not found`, HttpStatus.NOT_FOUND);
  }
}

export class TransactionNotFoundException extends HttpException {
  constructor(transactionId: string) {
    super(
      `Transaction with ID ${transactionId} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}

export class UserNotFoundException extends HttpException {
  constructor(userId: string) {
    super(`User with ID ${userId} not found`, HttpStatus.NOT_FOUND);
  }
}

export class InvalidTransactionException extends HttpException {
  constructor(message: string) {
    super(`Invalid Transaction: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedAccessException extends HttpException {
  constructor() {
    super('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}

export class DataValidationException extends HttpException {
  constructor(message: string) {
    super(`Data Validation Error: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

export class DatabaseOperationException extends HttpException {
  constructor(message: string) {
    super(
      `Database Operation Error: ${message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
export class ServiceUnavailableException extends HttpException {
  constructor(serviceName: string) {
    super(
      `${serviceName} is currently unavailable`,
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}

export class SubscriptionNotFoundException extends HttpException {
  constructor(subscriptionId: string) {
    super(
      `Subscription with ID ${subscriptionId} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}

export class FundBalanceNotFoundException extends HttpException {
  constructor(fundId: string) {
    super(`Fund Balance for Fund ID ${fundId} not found`, HttpStatus.NOT_FOUND);
  }
}
