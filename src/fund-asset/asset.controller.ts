import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/Asset.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiTags('Asset')
@ApiBearerAuth()
@Roles(RoleEnum.manager)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'asset', version: '1' })
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('assets/:fundId')
  async createAsset(
    @Req() req: Request,
    @Param('fundId') fundId: string,
    @Body(new ValidationPipe()) createAssetDto: CreateAssetDto,
  ): Promise<Asset> {
    const managerId = (req.user as User).id;
    return this.assetService.createAsset(createAssetDto, fundId, managerId);
  }

  @Get(':id')
  async getAsset(@Param('Asset Id') assetId: string): Promise<Asset> {
    return this.assetService.getAsset(assetId);
  }

  @Patch(':id')
  async updateAsset(
    @Param('Asset Id') assetId: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ): Promise<Asset> {
    return this.assetService.updateAsset(assetId, updateAssetDto);
  }
  @Get('get-all')
  async getAllAssets(): Promise<Asset[]> {
    return this.assetService.getAllAssets();
  }
  @Delete(':id')
  async deleteAsset(@Param('Asset Id') assetId: string): Promise<void> {
    return this.assetService.deleteAsset(assetId);
  }

  @Get('get-all-by-fund/:fundId')
  async getAllAssetsByFund(@Param('Fund Id') fundId: string): Promise<Asset[]> {
    return this.assetService.getAllAssetsByFund(fundId);
  }
}
