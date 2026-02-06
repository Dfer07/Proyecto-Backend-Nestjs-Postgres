import { IsString, IsEmail, IsNotEmpty, MinLength, ValidateNested, IsNotEmptyObject } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProfileDTO } from './create-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'usuario@ejemplo.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 3 caracteres)',
    example: 'password123',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @ApiProperty({
    description: 'Perfil del usuario con datos personales',
    type: () => CreateProfileDTO,
  })
  /* @IsNotEmptyObject() indica que el profile es obligatorio */
  @IsNotEmptyObject()
  /* @ValidateNested() realiza la validacion de los DTOs anidados */
  @ValidateNested()
  /* @Type() indica a class-transformer que el profile es un CreateProfileDTO */
  @Type(() => CreateProfileDTO)
  profile: CreateProfileDTO;
}
