import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategoryRepository, CategorySchema } from 'src/models';
import { CategoryFactoryService } from './factory/user.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFactoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule { }
