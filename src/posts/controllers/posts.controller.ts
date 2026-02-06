import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Crear un nuevo post' })
  @ApiBody({ type: CreatePostDTO })
  @ApiResponse({ status: 201, description: 'Post creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT requerido' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDTO, @Req() req: Request & { user: { userId: number } }) {
    createPostDto.userId = req.user.userId;
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Obtener todos los posts' })
  @ApiResponse({ status: 200, description: 'Lista de posts obtenida exitosamente' })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un post por ID' })
  @ApiParam({ name: 'id', description: 'ID del post', type: Number })
  @ApiResponse({ status: 200, description: 'Post encontrado' })
  @ApiResponse({ status: 404, description: 'Post no encontrado' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar un post' })
  @ApiParam({ name: 'id', description: 'ID del post a actualizar', type: Number })
  @ApiBody({ type: UpdatePostDTO })
  @ApiResponse({ status: 200, description: 'Post actualizado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT requerido' })
  @ApiResponse({ status: 404, description: 'Post no encontrado' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDTO) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Publicar un post (cambiar de borrador a publicado)' })
  @ApiParam({ name: 'id', description: 'ID del post a publicar', type: Number })
  @ApiResponse({ status: 200, description: 'Post publicado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT requerido' })
  @ApiResponse({ status: 404, description: 'Post no encontrado' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/publish')
  publish(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.publish(id);
  }

  @ApiOperation({ summary: 'Eliminar un post' })
  @ApiParam({ name: 'id', description: 'ID del post a eliminar', type: Number })
  @ApiResponse({ status: 200, description: 'Post eliminado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT requerido' })
  @ApiResponse({ status: 404, description: 'Post no encontrado' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
