import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [JwtService, AuthGuard],
  exports: [JwtService],
})
export class UserModule {}
