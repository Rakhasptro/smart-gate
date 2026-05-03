import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GateModule } from './gate/gate.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';

@Module({
  imports: [GateModule, PrismaModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtStrategy, JwtService],
})
export class AppModule {}
