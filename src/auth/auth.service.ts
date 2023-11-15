import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private JWT: JwtService,
    private config: ConfigService,
  ) {}
  /**
   * Create a new user account and store it in the database.
   * @param dto - The authentication DTO containing user information.
   * @returns A Promise resolving to the user object created in the database.
   * @throws ForbiddenException with message 'Email already exists' if the email is already in use.
   * @throws Error - Any other unexpected error during the database operation.
   */
  async signup(dto: AuthDto) {
    // hash password with argon
    const hash = await argon.hash(dto.password);
    try {
      // store the user in db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      // return the access token
      return this.signinToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if ((error.code = 'P2002')) {
          throw new ForbiddenException('Email already exist');
        }
      }
      throw error;
    }
  }
  /**
   * Sign in a user with the provided credentials.
   * @param dto - The authentication DTO containing user credentials.
   * @returns A Promise resolving to an object with an access_token property.
   * @throws ForbiddenException with message 'Invalid credentials' if the user is not found or the password is incorrect.
   */
  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if not found the throw an exception
    if (!user) throw new ForbiddenException('Invalid credentials');
    // compare the password
    const pwMatch = await argon.verify(user?.hash, dto.password);
    // if incorrect throw an exception
    if (!pwMatch) throw new ForbiddenException('Invalid credentials');
    // return the access token
    return this.signinToken(user.id, user.email);
  }

  /**
   * Sign in and generate an access token.
   * @param userId - The user ID.
   * @param email - The user's email.
   * @returns A Promise resolving to an object with an access_token property.
   */
  async signinToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    // generating the JWT token
    const token: string = await this.JWT.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return {
      access_token: token,
    };
  }
}
