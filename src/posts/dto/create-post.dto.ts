import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDTO {
  @ApiProperty({
    description: 'Título del post',
    example: 'Mi primer post en el blog',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({
    description: 'Contenido completo del post',
    example: 'Este es el contenido detallado de mi primer post...',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'URL de la imagen destacada del post',
    example: 'https://ejemplo.com/imagen.jpg',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    description: 'Resumen breve del post',
    example: 'En este post hablaremos sobre...',
    maxLength: 255,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  summary?: string;

  @ApiPropertyOptional({
    description: 'Indica si el post está en borrador',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @ApiPropertyOptional({
    description: 'ID del usuario autor (se asigna automáticamente desde el token JWT)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  userId: number;

  @ApiPropertyOptional({
    description: 'Array de IDs de categorías asociadas al post',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ArrayNotEmpty()
  categoriesId?: number[];
}
