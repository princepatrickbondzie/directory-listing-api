import {
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
  ParseIntPipe,
  Body,
  ValidationPipe,
  Get,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { App } from './entities/app.entity';
import { Roles } from '../common/dto/app.enums';
import { Role } from '../common/helpers/methods';
import { RoleGuard } from '../guards/role.guard';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

@Controller('apps')
@ApiTags('Apps')
@ApiBearerAuth()
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post()
  @Role([Roles.SuperAdmin])
  @UseGuards(RoleGuard)
  @ApiOperation({
    summary: 'Create a third party application',
  })
  async createApp(
    @Body(ValidationPipe) createAppDto: CreateAppDto,
  ): Promise<App> {
    return await this.appsService.createThirdPartyApp(createAppDto);
  }

  @Get()
  @Role([Roles.SuperAdmin])
  @UseGuards(RoleGuard)
  @ApiOperation({
    summary: 'Get all registered third party applications',
  })
  async getApps(): Promise<App[]> {
    return await this.appsService.getApps();
  }

  @Patch(':id')
  @Role([Roles.SuperAdmin])
  @UseGuards(RoleGuard)
  @ApiParam({ name: 'id', required: true })
  @ApiOperation({
    summary: 'Deactive a single third party application',
  })
  async deactivateApp(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.appsService.toggleApp(id);
  }

  @Get(':id')
  @Role([Roles.SuperAdmin])
  @UseGuards(RoleGuard)
  @ApiOperation({
    summary: 'Get one registered third party application',
  })
  async getOneApp(@Param('id') id: number): Promise<App> {
    return await this.appsService.getOneApp(id);
  }

  @Patch(':id')
  @Role([Roles.SuperAdmin])
  @UseGuards(RoleGuard)
  @ApiOperation({
    summary: 'update registered third party application',
  })
  async updateApp(
    @Param('id') id: number,
    @Body() updateAppDto: UpdateAppDto,
  ): Promise<App> {
    return await this.appsService.updateApp(id, updateAppDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.appsService.remove(+id);
  // }
}
