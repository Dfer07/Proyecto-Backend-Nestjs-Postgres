import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { Post } from './entities/post.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { PerplexityService } from './services/perplexity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category])],
  controllers: [PostsController, CategoriesController],
  providers: [PostsService, CategoriesService, PerplexityService],
  exports: [PostsService, CategoriesService],
})
export class PostsModule {}
