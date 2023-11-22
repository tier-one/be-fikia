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

  @Post('assets')
  async createAsset(
    @Req() req: Request,
    @Body(new ValidationPipe()) createAssetDto: CreateAssetDto,
  ): Promise<Asset> {
    const managerId = (req.user as User).id;
    return this.assetService.createAsset(createAssetDto, managerId);
  }

  @Get(':assetId')
  async getAsset(
    @Param('assetId') assetId: string,
    @Req() req: Request,
  ): Promise<Asset> {
    const managerId = (req.user as User).id;
    return this.assetService.getAsset(assetId, managerId);
  }

  @Patch(':assetId')
  async updateAsset(
    @Param('assetId') assetId: string,
    @Body() updateAssetDto: UpdateAssetDto,
    @Req() req: Request,
  ): Promise<Asset> {
    const managerId = (req.user as User).id;
    return this.assetService.updateAsset(assetId, updateAssetDto, managerId);
  }

  @Delete(':assetId')
  async deleteAsset(
    @Param('assetId') assetId: string,
    @Req() req: Request,
  ): Promise<void> {
    const managerId = (req.user as User).id;
    return this.assetService.deleteAsset(assetId, managerId);
  }

  @Get()
  async getAllAssets(@Req() req: Request): Promise<Asset[]> {
    const managerId = (req.user as User).id;
    return this.assetService.getAllAssets(managerId);
  }

  @Get(':fundId')
  async getAllAssetsByFund(
    @Param('fundId') fundId: string,
    @Req() req: Request,
  ): Promise<Asset[]> {
    const managerId = (req.user as User).id;
    return this.assetService.getAllAssetsByFund(fundId, managerId);
  }
}
