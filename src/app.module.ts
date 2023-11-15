import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BookmarkModule,
    PrismaModule,
    AuthModule,
    UserModule,
  ],
  providers: [UserService],
})
export class AppModule {}
