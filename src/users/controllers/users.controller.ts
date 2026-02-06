import { Controller, Get, Param, Post, Body, Delete, Put, /* HttpCode, HttpStatus, */ ParseIntPipe } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UsersService } from '../service/users.service';
import { ConfigService } from '@nestjs/config';
import { Config } from '../config.model';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService<Config, true>,
  ) {}

  @ApiOperation({ summary: 'Obtener perfil de un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
  @ApiResponse({ status: 200, description: 'Perfil del usuario obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get(':id/profile')
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getProfile(id);
  }

  @ApiOperation({ summary: 'Obtener posts de un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de posts del usuario obtenida exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get(':id/posts')
  getPosts(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getPosts(id);
  }

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente' })
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  createNewUser(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }

  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a actualizar', type: Number })
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Put(':id')
  updateUserById(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDTO) {
    return this.usersService.update(id, data);
  }

  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar', type: Number })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  //Esta linea permite cambiar el status code de la respuesta ya que por defecto Nest la deja en 200
  //sin embargo al poner 204 recuerda que no devolverá nada nunca, asi en el codigo pareciera que si.
  // @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
