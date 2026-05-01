import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('User tidak ditemukan');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Password salah');

    return user;
  }

  async register(data: { name: string; email: string; password: string }) {
  const existingUser = await this.prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('Email sudah digunakan');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await this.prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'ADMIN', // default admin
    },
  });

  return {
    message: 'User berhasil dibuat',
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };

    
  }
}