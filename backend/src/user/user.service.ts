import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailsUserDto } from './dto/userDetail.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async getAllUsers() {
    return await this.usersRepository.find();
  }

  async getUserById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async updateUser(id: number, dto: DetailsUserDto) {
    await this.usersRepository.update(id, dto);

    const updateduser = await this.usersRepository.findOne({
      where: { id },
    });

    if (!updateduser) throw new NotFoundException(`Product not found: ${id}`);
    return updateduser;
  }

  async deleteUser(id: number) {
    const result = await this.usersRepository.delete(id);
    if (!result.affected)
      throw new NotFoundException(`Product not found: ${id}`);
    return result.affected > 0;
  }
}
