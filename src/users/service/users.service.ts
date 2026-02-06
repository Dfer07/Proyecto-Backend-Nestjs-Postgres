import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.findUser(id); /* Busca el usuario por id */
    return user;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(data: CreateUserDTO) {
    try {
      const user = this.usersRepository.create(data); /* Crea un nuevo usuario (instancia) y aplica el @BeforeInsert*/
      return await this.usersRepository.save(user); /* Guarda el usuario en la base de datos */
    } catch {
      throw new BadRequestException('Error creating user');
    }
  }

  async update(id: number, data: UpdateUserDTO) {
    try {
      const user = await this.findUser(id);
      const userUpdated = this.usersRepository.merge(user, data); /* Une el usuario con los datos nuevos */
      return await this.usersRepository.save(userUpdated); /* Guarda el usuario actualizado */
    } catch {
      throw new BadRequestException('Error updating user');
    }
  }

  async delete(id: number) {
    const user = await this.findUser(id);
    await this.usersRepository.remove(user); /* Elimina el usuario */
    return { messaje: 'This user has been deleted.' };
  }

  async getProfile(id: number) {
    const user = await this.findUser(id, ['profile']);
    return user.profile;
  }

  async getPosts(id: number) {
    const user = this.findUser(id, ['posts']);
    return (await user).posts;
  }

  /* Metodo privado para buscar el usuario por id con relaciones */
  private async findUser(id: number, relations: string[] = []) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations,
    });
    if (!user) {
      throw new NotFoundException(`The user with id=${id} does not exist.`);
    }
    return user;
  }
}
