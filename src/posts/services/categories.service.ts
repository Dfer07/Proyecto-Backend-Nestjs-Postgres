import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO } from '../dto/create-category.dto';
import { UpdateCategoryDTO } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

  async getPosts(id: number) {
    const category = await this.categoriesRepository.findOne({ where: { id }, relations: ['posts'] });
    if (!category) {
      throw new NotFoundException(`The category with id=${id} does not exist.`);
    }
    return category.posts;
  }

  async findAll() {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`The category with id=${id} does not exist.`);
    }
    return category;
  }

  async create(data: CreateCategoryDTO) {
    const newCategory = this.categoriesRepository.create(data);
    return this.categoriesRepository.save(newCategory);
  }

  async update(id: number, data: UpdateCategoryDTO) {
    const category = await this.findOne(id);
    const updateCategory = this.categoriesRepository.merge(category, data);
    const categoryUpdated = await this.categoriesRepository.save(updateCategory);
    return categoryUpdated;
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await this.categoriesRepository.remove(category);
    return { message: `Category #${id} removed successfully` };
  }
}
