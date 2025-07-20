import { Controller, Post, Body, UseGuards, Get, Request  } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.create(body.email, body.password);
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }

   @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; 
  }

  
}
