import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';
import { PerplexityService } from './perplexity.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private perplexityService: PerplexityService,
  ) {}

  findAll() {
    return this.postsRepository.find({ relations: ['user.profile', 'categories'] });
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  async create(createPostDto: CreatePostDTO) {
    try {
      const newPost = this.postsRepository.create(createPostDto);
      // Asignar manualmente el usuario usando el ID del DTO
      const post = await this.postsRepository.save({
        ...newPost,
        user: { id: createPostDto.userId },
        categories: createPostDto.categoriesId?.map((id) => ({ id })),
      });
      return post;
    } catch {
      throw new BadRequestException('Error creating post');
    }
  }

  async update(id: number, updatePostDto: UpdatePostDTO) {
    const post = await this.findOne(id);
    const data = { ...updatePostDto, user: { id: updatePostDto.userId }, categories: updatePostDto.categoriesId?.map((category) => ({ id: category })) };
    console.log(data);
    this.postsRepository.merge(post, data);
    await this.postsRepository.save(post);
    return this.postsRepository.findOne({ where: { id }, relations: ['user', 'categories'] });
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    await this.postsRepository.remove(post);
    return { message: `Post #${id} removed successfully` };
  }

  async publish(id: number) {
    // 1. Buscar el post
    const post = await this.findOne(id);

    // 2. Verificar que el post esté en modo draft
    if (!post.isDraft) {
      throw new BadRequestException('Post is already published');
    }

    // 3. Verificar que tenga título y contenido
    if (!post.title || !post.content) {
      throw new BadRequestException('Post must have title and content to be published');
    }

    // 4. Generar summary e image usando Perplexity AI
    try {
      const [summary, image] = await Promise.all([this.perplexityService.generateSummary(post.title, post.content), this.perplexityService.generateImageUrl(post.title, post.content)]);

      // 5. Actualizar el post con summary, image y isDraft en false
      post.summary = summary;
      post.image = image;
      post.isDraft = false;

      // 6. Guardar los cambios
      await this.postsRepository.save(post);

      // 7. Retornar el post actualizado con relaciones
      return this.postsRepository.findOne({ where: { id }, relations: ['user', 'categories'] });
    } catch (error) {
      console.error('Error publishing post:', error);
      throw new BadRequestException('Failed to publish post. Error generating AI content.');
    }
  }
}
