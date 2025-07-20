import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,private readonly prisma: PrismaService
  ) {
   
  }
async findAll() {
    return this.prisma.user.findMany();
  }
  async create(email: string, password: string): Promise<User> {

  const newUser = this.usersRepository.create({ email, password });
  return this.usersRepository.save(newUser);
}
async deleteAll(): Promise<void> {
  await this.usersRepository.clear();
}

 async findByEmail(email: string): Promise<User | null> {
  return this.usersRepository.findOne({ where: { email } });
}


}
