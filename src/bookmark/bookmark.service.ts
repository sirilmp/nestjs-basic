/**
 * @module BookmarkService
 * @description Service responsible for handling bookmark-related operations.
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  /**
   * @constructor
   * @param {PrismaService} prisma - The Prisma service instance for database interactions.
   */
  constructor(private prisma: PrismaService) {}
  /**
   * @method createNewBookmark
   * @description Creates a new bookmark for a user.
   * @param {number} userId - The ID of the user for whom the bookmark is created.
   * @param {CreateBookmarkDto} dto - The data transfer object containing bookmark details.
   * @returns {Object} - An object containing the HTTP status code, a message, and the created bookmark data.
   * @throws {Error} - Throws an error if the creation fails.
   */
  async createNewBookmark(userId: number, dto: CreateBookmarkDto) {
    try {
      const bookmark = await this.prisma.bookmark.create({
        data: {
          userId,
          ...dto,
        },
      });
      return { code: HttpStatus.OK, message: 'success', data: bookmark };
    } catch (error) {
      throw error;
    }
  }
  /**
   * @method getBookmarkById
   * @description Retrieves a bookmark by its ID for a specific user.
   * @param {number} userId - The ID of the user for whom the bookmark is retrieved.
   * @param {number} bookmarkId - The ID of the bookmark to be retrieved.
   * @returns {Object} - An object containing the HTTP status code, a message, and the retrieved bookmark data.
   * @throws {Error} - Throws an error if the retrieval fails.
   */
  async getBookmarkById(userId: number, bookmarkId: number) {
    try {
      const bookmark = await this.prisma.bookmark.findFirst({
        where: {
          userId,
          id: bookmarkId,
        },
      });
      return { code: HttpStatus.OK, message: 'success', data: bookmark };
    } catch (error) {
      throw error;
    }
  }
  /**
   * @method getBookmarksByUserId
   * @description Retrieves all bookmarks for a specific user.
   * @param {number} userId - The ID of the user for whom bookmarks are retrieved.
   * @returns {Object} - An object containing the HTTP status code, a message, and an array of retrieved bookmarks.
   * @throws {Error} - Throws an error if the retrieval fails.
   */
  async getBookmarksByUserId(userId: number) {
    try {
      const bookmarks = await this.prisma.bookmark.findMany({
        where: {
          userId,
        },
      });
      return { code: HttpStatus.CREATED, message: 'success', data: bookmarks };
    } catch (error) {
      throw error;
    }
  }
  /**
   * @method updateBookmarkById
   * @description Updates a bookmark by its ID for a specific user.
   * @param {number} userId - The ID of the user for whom the bookmark is updated.
   * @param {number} bookmarkId - The ID of the bookmark to be updated.
   * @param {EditBookmarkDto} dto - The data transfer object containing updated bookmark details.
   * @returns {Object} - An object containing the HTTP status code, a message, and the updated bookmark data.
   * @throws {Error} - Throws an error if the update fails.
   */
  async updateBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    try {
      const bookmarks = await this.prisma.bookmark.update({
        where: {
          userId,
          id: bookmarkId,
        },
        data: {
          ...dto,
        },
      });
      return { code: HttpStatus.CREATED, message: 'success', data: bookmarks };
    } catch (error) {
      throw error;
    }
  }
}
