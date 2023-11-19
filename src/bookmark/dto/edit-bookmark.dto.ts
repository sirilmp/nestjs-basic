import { IsOptional, IsString } from 'class-validator';

export class EditBookmarkDto {
  /**
   * @property {string} title - The updated title of the bookmark.
   * @example 'Updated Title'
   */
  @IsString()
  @IsOptional()
  title?: string;
  /**
   * @property {string} description - The updated description of the bookmark.
   * @example 'Updated Description'
   */
  @IsString()
  @IsOptional()
  description?: string;
  /**
   * @property {string} link - The updated link of the bookmark.
   * @example 'https://updated-link.com'
   */
  @IsString()
  @IsOptional()
  link?: string;
}
