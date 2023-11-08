import { ApiProperty } from '@nestjs/swagger';

export class PortfolioItemDto {
  @ApiProperty({ example: 'Technology Fund' })
  fundName: string;

  @ApiProperty({ example: 50 })
  numberOfShares: number;

  @ApiProperty({ example: 150 })
  currentShareValue: number;

  @ApiProperty({ example: 7500 })
  totalValue: number;
}

export class InvestorPortfolioDto {
  @ApiProperty({ type: [PortfolioItemDto] })
  portfolioItems: PortfolioItemDto[];

  @ApiProperty({ example: 20000 })
  totalInvested: number;

  @ApiProperty({ example: 25000 })
  totalCurrentValue: number;
}
