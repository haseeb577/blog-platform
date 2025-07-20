import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface CreatePostDto {
  title: string;
  content: string;
}

interface UpdatePostDto {
  title?: string;
  content?: string;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() post: CreatePostDto, @Req() req: Request) {
    const author = (req as any).user?.email;
    return this.postsService.createPost(post, author);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const email = (req as any).user?.email;
    return this.postsService.getAllPostsByUser(email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: UpdatePostDto,
    @Req() req: Request,
  ) {
    const email = (req as any).user?.email;
    return this.postsService.updatePost(Number(id), updateData, email);
  }
  @UseGuards(JwtAuthGuard)
@Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }


}
