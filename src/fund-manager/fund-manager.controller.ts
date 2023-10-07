import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateFundDto } from './dto/create-fund.dto';
import { FundManagerService } from './fund-manager.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateAssetDto } from './dto/create-asset.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/Order.entity';
import { CreateFundSetupDto } from './dto/fund-setup.dto';

@ApiBearerAuth()
@Roles(RoleEnum.manager)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'fund-manager',
  version: '1',
})
export class FundManagerController {
  constructor(private readonly fundManagerService: FundManagerService) {}

  @ApiTags('Fund')
  @Post('create-fund/:managerId/:investorId')
  async createFund(
    @Param('managerId') managerId: string,
    @Param('investorId') investorId: string,
    @Body(new ValidationPipe()) createFundDto: CreateFundDto,
  ) {
    try {
      const fund = await this.fundManagerService.createFund(
        managerId,
        investorId,
        createFundDto,
      );
      return { message: 'Fund created successfully', fund };
    } catch (error) {
      throw error;
    }
  }
  @ApiTags('Fund')
  @Get('get-fund/:fundId')
  async getFund(@Param('fundId') fundId: string) {
    try {
      const fund = await this.fundManagerService.getFund(fundId);
      return { message: 'Fund retrieved successfully', fund };
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Fund')
  @Get('get-all-fund')
  async getAllFund() {
    try {
      const fund = await this.fundManagerService.getAllFund();
      return { message: 'Fund retrieved successfully', fund };
    } catch (error) {
      throw error;
    }
  }
  @ApiTags('Fund-setup')
  @Post(':managerId/:investorId')
  createFundSetup(
    @Param('managerId') managerId: string,
    @Param('investorId') investorId: string,
    @Body() createFundSetupDto: CreateFundSetupDto,
  ) {
    return this.fundManagerService.createFundSetup(
      managerId,
      investorId,
      createFundSetupDto,
    );
  }

  @ApiTags('Fund-setup')
  @Get('get-fund-setup/:fundSetupId')
  async getFundSetup(@Param('fundSetupId') fundSetupId: string) {
    try {
      const fund = await this.fundManagerService.getFundSetUp(fundSetupId);
      return { message: 'Fund retrieved successfully', fund };
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Fund-setup')
  @Get('get-all-fund-setup')
  async getAllFundSetup() {
    try {
      const fund = await this.fundManagerService.getAllFundSetUp();
      return { message: 'Fund retrieved successfully', fund };
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Asset')
  @Post('create-asset/:managerId')
  createAsset(
    @Param('managerId') managerId: string,
    @Body(new ValidationPipe()) createAssetDto: CreateAssetDto,
  ) {
    return this.fundManagerService.createAsset(managerId, createAssetDto);
  }

  @ApiTags('Asset')
  @Get('get-asset/:assetId')
  getAsset(@Param('assetId') assetId: string) {
    return this.fundManagerService.getAsset(assetId);
  }

  @ApiTags('Asset')
  @Get('get-all-asset')
  async getAllAsset() {
    try {
      const asset = await this.fundManagerService.getAllAsset();
      return { message: 'Asset retrieved successfully', asset };
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Transaction')
  @Post('create-transaction/:managerId/:assetId')
  createTransaction(
    @Param('managerId') managerId: string,
    @Param('assetId') assetId: string,
    @Body(new ValidationPipe()) createTransactionDto: CreateTransactionDto,
  ) {
    return this.fundManagerService.createTransaction(
      managerId,
      assetId,
      createTransactionDto,
    );
  }

  @ApiTags('Transaction')
  @Get('get-transaction/:transactionId')
  viewTransaction(@Param('transactionId') transactionId: string) {
    return this.fundManagerService.viewTransaction(transactionId);
  }

  @ApiTags('Order')
  @Post('place-order/:managerId/:assetId')
  async createOrder(
    @Param('managerId') managerId: string,
    @Param('assetId') assetId: string,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.fundManagerService.placeOrder(
      managerId,
      assetId,
      createOrderDto,
    );
  }

  @ApiTags('Order')
  @Get('get-order/:orderId')
  async getOrder(@Param('orderId') orderId: string): Promise<Order> {
    return this.fundManagerService.getOrder(orderId);
  }

  @ApiTags('Order')
  @Post('place-order/:investorId/:assetId/:fundId')
  async createOrder(
    @Param('investorId') investorId: string,
    @Param('assetId') assetId: string,
    @Param('fundId') fundId: string,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.fundManagerService.placeOrder(
      investorId,
      assetId,
      fundId,
      createOrderDto,
    );
  }

  @ApiTags('Order')
  @Post('execute-order/:orderId/:investorId')
  async executeOrder(
    @Param('orderId') orderId: string,
    @Param('investorId') investorId: string,
  ) {
    try {
      await this.fundManagerService.executeOrder(orderId, investorId);
      return { message: 'Payment processed successfully' };
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Order')
  @Get('get-order/:orderId')
  async getOrder(@Param('orderId') orderId: string): Promise<Order> {
    return this.fundManagerService.getOrder(orderId);
  }

  @ApiTags('Order')
  @Get('get-all-order')
  async getAllOrder() {
    try {
      const order = await this.fundManagerService.getAllOrders();
      return { message: 'Orders retrieved successfully', order };
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('subscription')
  @Post('subscription/:investorId/:fundId')
  createSubscription(
    @Param('investorId') investorId: string,
    @Param('fundId') fundId: string,
  ) {
    return this.fundManagerService.createSubscription(investorId, fundId);
  }

  @ApiTags('subscription')
  @Get('get-all-order')
  async getAllSubscription() {
    try {
      const subscription = await this.fundManagerService.getAllSuscription();
      return { message: 'Orders retrieved successfully', subscription };
    } catch (error) {
      throw error;
    }
  }
}
