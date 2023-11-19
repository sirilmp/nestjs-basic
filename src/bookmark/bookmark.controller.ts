/**
 * @module BookmarkController
 * @description Controller responsible for handling bookmark-related HTTP requests.
 */
import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

/**
 * Controller class for managing bookmark-related operations.
 * @class
 */
@UseGuards(AuthGuard)
@Controller('bookmarks')
export class BookmarkController {
  /**
   * Constructor for the BookmarkController class.
   * @constructor
   * @param {BookmarkService} bookmarkService - An instance of the BookmarkService for handling bookmark operations.
   */
  constructor(private bookmarkService: BookmarkService) {}
  /**
   * Endpoint for creating a new bookmark.
   * @method
   * @param {CreateBookmarkDto} dto - The data transfer object containing bookmark details.
   * @param {Request} req - The HTTP request object.
   * @returns {Promise<Object>} - A promise resolving to an object representing the HTTP response.
   */
  @Post('create')
  createNewBookmark(@Body() dto: CreateBookmarkDto, @Request() req: any) {
    return this.bookmarkService.createNewBookmark(parseInt(req.user.sub), dto);
  }
  /**
   * Endpoint for retrieving a bookmark by its ID.
   * @method
   * @param {string} bookmarkId - The ID of the bookmark to be retrieved.
   * @param {Request} req - The HTTP request object.
   * @returns {Promise<Object>} - A promise resolving to an object representing the HTTP response.
   */
  @Get('get-by-id/:id')
  getBookmarkById(@Param('id') bookmarkId: string, @Request() req: any) {
    return this.bookmarkService.getBookmarkById(
      parseInt(req.user.sub),
      parseInt(bookmarkId),
    );
  }
  /**
   * Endpoint for retrieving all bookmarks for a specific user.
   * @method
   * @param {string} userId - The ID of the user for whom bookmarks are retrieved.
   * @param {Request} req - The HTTP request object.
   * @returns {Promise<Object>} - A promise resolving to an object representing the HTTP response.
   */
  @Get('get-by-user-id/:id')
  getBookmarksByUserId(@Param('id') bookmarkId: string, @Request() req: any) {
    return this.bookmarkService.getBookmarksByUserId(parseInt(req.user.sub));
  }
  /**
   * Endpoint for updating a bookmark by its ID.
   * @method
   * @param {EditBookmarkDto} dto - The data transfer object containing updated bookmark details.
   * @param {string} bookmarkId - The ID of the bookmark to be updated.
   * @param {Request} req - The HTTP request object.
   * @returns {Promise<Object>} - A promise resolving to an object representing the HTTP response.
   */
  @Post('update/:id')
  updateBookmarkById(
    @Body() dto: EditBookmarkDto,
    @Param('id') bookmarkId: string,
    @Request() req: any,
  ) {
    return this.bookmarkService.updateBookmarkById(
      parseInt(req.user.sub),
      parseInt(bookmarkId),
      dto,
    );
  }
}
