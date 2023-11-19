import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoami(@Request() req) {
    return req.user;
  }
}
