import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { DetailsUserDto } from './dto/userDetail.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }

  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() dto: DetailsUserDto) {
    return await this.usersService.updateUser(id, dto);
  }

  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.deleteUser(id);
  }
}
