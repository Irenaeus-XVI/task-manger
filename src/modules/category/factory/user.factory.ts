import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { Category } from '../entities/category.entity';
import { Types } from 'mongoose';

@Injectable()
export class CategoryFactoryService {
  async createNewCategory(createCategoryDto: CreateCategoryDto, userId: Types.ObjectId) {
    const newCategory = new Category();

    newCategory.name = createCategoryDto.name;
    newCategory.user = userId;
    return newCategory;
  }

  updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const newCategory = new Category();

    newCategory.name = updateCategoryDto.name && updateCategoryDto.name;

    return newCategory;
  }
}
