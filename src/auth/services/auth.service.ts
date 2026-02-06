import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    /* Retornamos el usuario sin miedo porque en el main.ts aplicamos el 
    ClassSerializerInterceptor y el @Exclude en el entity la cual oculta el password */
    return user;
  }

  generateJWT(user: User) {
    const payload = { sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
