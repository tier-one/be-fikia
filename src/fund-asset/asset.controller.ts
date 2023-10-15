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
import { CreateAssetDto } from './dto/create-asset.dto';
import { AssetService } from './asset.service';
@ApiBearerAuth()
@Roles(RoleEnum.manager)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'Asset',
  version: '1',
})
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @ApiTags('Asset')
  @Post('create-asset/:investroId/:fundId')
  createAsset(
    @Param('investroId') investorId: string,
    @Param('fundId') fundId: string,
    @Body(new ValidationPipe()) createAssetDto: CreateAssetDto,
  ) {
    return this.assetService.createAsset(fundId, investorId, createAssetDto);
  }

  @ApiTags('Asset')
  @Get('get-asset/:assetId')
  getAsset(@Param('assetId') assetId: string) {
    return this.assetService.getAsset(assetId);
  }

  @ApiTags('Asset')
  @Get('get-all-asset')
  async getAllAsset() {
    try {
      const asset = await this.assetService.getAllAsset();
      return { message: 'Asset retrieved successfully', asset };
    } catch (error) {
      throw error;
    }
  }
}
