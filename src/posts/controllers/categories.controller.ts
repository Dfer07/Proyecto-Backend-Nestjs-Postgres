import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDTO } from '../dto/create-category.dto';
import { UpdateCategoryDTO } from '../dto/update-category.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Obtener posts de una categoría' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de posts de la categoría obtenida exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @Get(':id/posts')
  async getPosts(@Param('id', ParseIntPipe) id: number) {
    const posts = await this.categoriesService.getPosts(id);
    return posts;
  }

  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de categorías obtenida exitosamente' })
  @Get()
  getCategories() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', type: Number })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @Get(':id')
  getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiBody({ type: CreateCategoryDTO })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  createCategory(@Body() data: CreateCategoryDTO) {
    return this.categoriesService.create(data);
  }

  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiParam({ name: 'id', description: 'ID de la categoría a actualizar', type: Number })
  @ApiBody({ type: UpdateCategoryDTO })
  @ApiResponse({ status: 200, description: 'Categoría actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @Put(':id')
  async updateCategory(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCategoryDTO) {
    const updateCategory = await this.categoriesService.update(id, data);
    return updateCategory;
  }

  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiParam({ name: 'id', description: 'ID de la categoría a eliminar', type: Number })
  @ApiResponse({ status: 200, description: 'Categoría eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    const deleteCategory = await this.categoriesService.remove(id);
    return deleteCategory;
  }
}
