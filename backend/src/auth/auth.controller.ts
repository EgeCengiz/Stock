import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { DetailsUserDto } from 'src/user/dto/userDetail.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Public()
  register(@Body() dto: DetailsUserDto): Promise<DetailsUserDto | null> {
    return this.authService.register(dto);
  }

  @Post('/login')
  @Public()
  login(@Body() dto: CreateUserDto): Promise<{ access_token: string } | null> {
    return this.authService.login(dto);
  }
}
