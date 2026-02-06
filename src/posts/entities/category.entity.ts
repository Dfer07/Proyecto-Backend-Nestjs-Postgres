import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'update_at' })
  updateAt: Date;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}
