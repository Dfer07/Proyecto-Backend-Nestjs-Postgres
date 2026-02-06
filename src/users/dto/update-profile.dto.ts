import { PartialType } from '@nestjs/swagger';
import { CreateProfileDTO } from './create-profile.dto';

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {}

/* 
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  avatar?: string;
 */
