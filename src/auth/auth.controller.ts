import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /**
   * Endpoint for user sign-in.
   * @param dto - The authentication data including email and password.
   * @returns A Promise with the result of the sign-in process.
   */
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
  /**
   * Endpoint for user sign-up.
   * @param dto - The authentication data including email and password.
   * @returns A Promise with the result of the sign-up process.
   */
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
}
