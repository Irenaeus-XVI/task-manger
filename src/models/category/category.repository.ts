import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { AbstractRepository } from '../abstract.repository';

export class CategoryRepository extends AbstractRepository<Category> {
    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<CategoryDocument>,
    ) {
        super(categoryModel);
    }
}
