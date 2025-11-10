/* eslint-disable */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { DetailsUserDto } from 'src/user/dto/userDetail.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: CreateUserDto) {
  const user = await this.usersService.findByEmail(dto.email);
  if (!user) throw new UnauthorizedException('Email veya şifre hatalı');

 
  const match = await bcrypt.compare(dto.password, user.password);
  if (!match) throw new UnauthorizedException('Email veya şifre hatalı');

  const payload = { sub: user.id, email: user.email, role: user.role };
  return {
    access_token: this.jwtService.sign(payload),
  };
}


 async register(createUserDto: DetailsUserDto) {
  const hashed = await bcrypt.hash(createUserDto.password, 10);
  return this.usersService.create({ ...createUserDto, password: hashed });
}

}
