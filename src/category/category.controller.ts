import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
// import { UserAuthGuard } from '../guards/auth-user.guard';
import { Role } from '../common/helpers/methods';
import { Roles } from '../common/dto/app.enums';
// import { AppGuard } from '../guards/app.guard';
import { RoleGuard } from '../guards/role.guard';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Role([Roles.SuperAdmin, Roles.Admin, Roles.CustomerSupport])
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'create category' })
  async createCategory(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get('active')
  // @UseGuards(AppGuard)
  @ApiOperation({ summary: 'get active categories' })
  async getActiveCategories(): Promise<Category[]> {
    return await this.categoryService.getActiveCategories();
  }

  @Get()
  // @UseGuards(AppGuard)
  @ApiOperation({ summary: 'get all categories' })
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get(':id')
  // @UseGuards(AppGuard)
  @ApiOperation({ summary: 'get one category' })
  async getOneCategory(@Param('id') id: number) {
    return await this.categoryService.getOneCategory(id);
  }

  @Patch(':id')
  @Role([Roles.SuperAdmin, Roles.Admin, Roles.CustomerSupport])
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'update category' })
  async updateCategory(
    @Param('id') id: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @Role([Roles.SuperAdmin, Roles.Admin, Roles.CustomerSupport])
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'delete category' })
  async removeCategory(@Param('id') id: number) {
    return await this.categoryService.removeCategory(id);
  }
}
