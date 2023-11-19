import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  /**
   * The title of the bookmark.
   * @type {string}
   * @example 'Sample Bookmark'
   * @isString
   * @isNotEmpty
   */
  @IsString()
  @IsNotEmpty()
  title: string;
  /**
   * The optional description of the bookmark.
   * @type {string | undefined}
   * @example 'A brief description of the bookmark.'
   * @isString
   * @isOptional
   */
  @IsString()
  @IsOptional()
  description?: string;
  /**
   * The link associated with the bookmark.
   * @type {string}
   * @example 'https://example.com'
   * @isString
   * @isNotEmpty
   */
  @IsNotEmpty()
  @IsString()
  link: string;
}
