/**
 * AuthGuard
 *
 * This guard is responsible for authenticating incoming requests based on a JWT token
 * passed in the `Authorization` header as a Bearer token. It uses the NestJS ConfigService
 * to retrieve the JWT secret and the NestJS JwtService to verify the token's validity.
 *
 * @class
 * @implements {CanActivate}
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * AuthGuard Constructor
   *
   * @constructor
   * @param {ConfigService} config - The ConfigService for retrieving configuration env values.
   * @param {JwtService} jwtService - The JwtService for verifying JWT tokens.
   */
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}
  /**
   * canActivate
   *
   * This method is called by NestJS to determine whether the route should be activated
   * based on the provided context. It checks for the presence of a valid JWT token in the
   * `Authorization` header and verifies its validity using the JwtService.
   *
   * @async
   * @param {ExecutionContext} context - The current execution context.
   * @returns {Promise<boolean>} - A boolean indicating whether the route should be activated.
   * @throws {UnauthorizedException} - Thrown if the token is missing or invalid.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // If no token is provided, throw an UnauthorizedException
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // Verify the token using the JwtService and the JWT_SECRET from the configuration
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get('JWT_SECRET'),
      });
      // Attach the payload (user information) to the request for further use
      request['user'] = payload;
    } catch {
      // If the verification fails, throw an UnauthorizedException
      throw new UnauthorizedException();
    }
    return true;
  }
  /**
   * extractTokenFromHeader
   *
   * This method extracts the JWT token from the `Authorization` header of the incoming request.
   *
   * @param {Request} request - The incoming HTTP request.
   * @returns {string | undefined} - The extracted token or undefined if not present or invalid.
   */
  extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers['authorization'];
    // If no Authorization header is present, return undefined
    if (!authorizationHeader) {
      return undefined;
    }
    const [type, token] = authorizationHeader.split(' ') || [];
    // If the token type is not 'Bearer' or the token is missing, return undefined
    if (type.toLowerCase() !== 'bearer' || !token) {
      return undefined;
    }
    // Return the extracted token
    return type === 'Bearer' ? token : undefined;
  }
}
