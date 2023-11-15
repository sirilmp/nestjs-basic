import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
/**
 * AuthDto
 *
 * This class defines the data transfer object (DTO) used for handling authentication-related data.
 * It includes validation decorators from the class-validator library to enforce data integrity.
 *
 * @class
 */
export class AuthDto {
  /**
   * @property {string} email - The email address of the user.
   * @validator {IsEmail} - Ensures that the email has a valid email format.
   * @validator {IsNotEmpty} - Ensures that the email is not an empty string.
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;
  /**
   * @property {string} password - The password of the user.
   * @validator {IsString} - Ensures that the password is a string.
   * @validator {IsNotEmpty} - Ensures that the password is not an empty string.
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
