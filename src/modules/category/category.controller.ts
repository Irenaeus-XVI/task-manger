import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Request } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateResponse, FindAllQuery, FindAllResponse, FindOneResponse, RemoveResponse } from 'src/common/dto';
import { Category } from 'src/models';
import { CategoryFactoryService } from './factory/user.factory';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactoryService: CategoryFactoryService,
  ) {
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req: Express.Request,
  ) {
    const createCategoryResponse = new CreateResponse<Category>();

    try {
      const category =
        await this.categoryFactoryService.createNewCategory(createCategoryDto,
          req.user['_id']);

      const categoryCreated = await this.categoryService.createCategory(category);

      createCategoryResponse.success = true;
      createCategoryResponse.data = categoryCreated;

    } catch (error) {
      createCategoryResponse.success = false;
      createCategoryResponse.data = error;
    }
    return createCategoryResponse;
  }

  @ApiOperation({ summary: 'Get All Categories' })
  @Get()
  async getCategories(@Query() query: FindAllQuery) {
    const getCategoriesResponse = new FindAllResponse<Category>();
    try {
      const categories = await this.categoryService.findAll(query);
      getCategoriesResponse.success = true;
      getCategoriesResponse.data = categories.data;
      getCategoriesResponse.currentPage = categories.currentPage;
      getCategoriesResponse.numberOfPages = categories.numberOfPages;
      getCategoriesResponse.numberOfRecords = categories.numberOfRecords;
    } catch (error) {
      getCategoriesResponse.success = false;
      throw error;
    }
    return getCategoriesResponse;
  }

  @ApiOperation({ summary: 'Get Specific Category' })
  @Get(':categoryId')
  async getCategory(@Param('categoryId') categoryId: string) {
    const getCategoryResponse = new FindOneResponse<Category>();

    try {
      const category = await this.categoryService.findCategory(
        categoryId,
      );
      getCategoryResponse.success = true;
      getCategoryResponse.data = category;
    } catch (error) {
      getCategoryResponse.success = false;
      throw error;
    }
    return getCategoryResponse;
  }

  @Patch(':categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() createCategoryDto: UpdateCategoryDto,
  ) {
    const updateCategoryResponse = new CreateResponse<Category>();

    try {
      const category =
        this.categoryFactoryService.updateCategory(createCategoryDto);

      const categoryUpdated = await this.categoryService.updateCategory(
        categoryId,
        category,
      );

      updateCategoryResponse.success = true;
      updateCategoryResponse.data = categoryUpdated;
    } catch (error) {
      updateCategoryResponse.success = false;
      throw error;
    }
    return updateCategoryResponse;
  }


  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    const deleteCategoryResponse = new RemoveResponse();

    try {
      await this.categoryService.deleteCategory(categoryId);
      deleteCategoryResponse.success = true;
    } catch (error) {
      deleteCategoryResponse.success = false;
      throw error;
    }
    return deleteCategoryResponse;
  }
} 
