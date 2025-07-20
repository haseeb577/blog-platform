import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  private users: { email: string; password: string; name: string }[] = [];
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create(email, hashedPassword); 
  }

  async login(email: string, password: string) {
  const user = await this.usersService.findByEmail(email);
  console.log('User found:', user);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    console.log('Invalid credentials');
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { sub: user.id, email: user.email };
  return {
    access_token: this.jwtService.sign(payload),
    user: {
      id: user.id,
      email: user.email,
    },
  };
}


  async validateUser(email: string, password: string): Promise<any> {
  const user = await this.usersService.findByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    const { password, ...result } = user;
    return result;
  }
  return null;
}
findByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }
}
