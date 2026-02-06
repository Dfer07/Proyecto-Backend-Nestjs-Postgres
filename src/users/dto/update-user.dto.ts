/* Forma correcta moderna y experta */
import { OmitType, PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';
import { ValidateNested, IsOptional, IsNotEmptyObject } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProfileDTO } from './update-profile.dto';

export class UpdateUserDTO extends PartialType(OmitType(CreateUserDTO, ['profile'])) {
  @ApiPropertyOptional({
    description: 'Perfil del usuario con datos personales actualizables',
    type: () => UpdateProfileDTO,
  })
  @IsNotEmptyObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProfileDTO)
  profile?: UpdateProfileDTO;
}

/* Forma preliminar básica pero no es buena practica en producción */
// import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

// export class UpdateUserDTO {
//   @IsOptional() /* Para tiempo de ejecucion run-time */
//   @IsEmail()
//   @IsNotEmpty()
//   email?: string; /*  El ? es para TS en tiempo de compilacion */

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   name?: string;
// }
