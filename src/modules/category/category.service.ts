import { ConflictException, Injectable } from '@nestjs/common';
import { message } from 'src/common/constants/message.constatns';
import { FindAllQuery } from 'src/common/dto';
import { Category, CategoryRepository } from 'src/models';

@Injectable()
export class CategoryService {
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) { }

    async createCategory(category: Category) {
        try {
            const isExist = await this.categoryRepository.exists({ name: category.name });
            if (isExist) throw new ConflictException(message.category.AlreadyExists);

            const categoryCreated = await this.categoryRepository.create(category);
            return categoryCreated;
        } catch (error) {
            throw error;
        }
    }

    async findAll(query: FindAllQuery) {
        try {
            const categories = await this.categoryRepository.getAll({
                isDeleted: false
            }, query);
            if (!categories) throw new ConflictException(message.category.NotFound);

            return categories;
        } catch (error) {
            throw error;
        }
    }


    async findCategory(categoryId: string) {
        try {
            const category = await this.categoryRepository.getOne(
                {
                    _id: categoryId,
                    isDeleted: false
                },
                {},
                {
                    populate: [{
                        path: 'user',
                        select: 'name email '
                    }]
                });
            if (!category) throw new ConflictException(message.category.NotFound);

            return category;
        } catch (error) {
            throw error;
        }
    }

    async updateCategory(categoryId: string, category: Category) {
        try {
            const categoryUpdated = await this.categoryRepository.update(
                { _id: categoryId },
                category,
                { new: true }
            );
            if (!categoryUpdated) throw new ConflictException(message.category.FailedToUpdate);

            return categoryUpdated;
        } catch (error) {
            throw error;
        }
    }

    async deleteCategory(categoryId: string) {
        try {
            const categoryDeleted = await this.categoryRepository.update(
                { _id: categoryId },
                { isDeleted: true },
                { new: true }
            );
            if (!categoryDeleted) throw new ConflictException(message.category.FailedToDelete);

            return categoryDeleted;
        } catch (error) {
            throw error;
        }
    }
}
