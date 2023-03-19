import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;

    const ctg = await this.repo.findOne({ where: { name } });
    if (ctg) {
      throw new ConflictException('category is already registered');
    }

    const category = this.repo.create(createCategoryDto);
    return category;
  }

  async getActiveCategories(): Promise<Category[]> {
    return await this.repo.find({ where: { active: true } });
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.repo.find();
  }

  async getOneCategory(id: number): Promise<Category> {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('category was not found');
    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    const { name, description, active } = updateCategoryDto;

    const category = await this.repo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('category was not found');

    return await this.repo.update(
      { id },
      {
        name: name || category.name,
        description: description || category.description,
        active: active || category.active,
      },
    );
  }

  async removeCategory(id: number): Promise<void> {
    const results = await this.repo.delete(id);
    if (results.affected === 0) {
      throw new NotFoundException('category was not found.');
    }
  }
}
