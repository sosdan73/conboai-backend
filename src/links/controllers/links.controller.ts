import {
  Controller,
  Get,
  Res,
  Param,
  Post,
  Body,
  HttpCode,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateLinkDto } from '../dto/create-link.dto';
import { LinksService } from '../services/links.service';

@Controller()
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('links/create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createLinkDto: CreateLinkDto) {
    return await this.linksService.findByOriginalUrl(createLinkDto.originalUrl);
  }

  @Get(':shortenedId')
  async redirectToOriginal(
    @Param('shortenedId') shortenedId: string,
    @Res() res: Response,
  ) {
    try {
      const link = await this.linksService.findByShortenedId(shortenedId);
      if (link) {
        const redirectUrl =
          link.originalUrl.startsWith('http://') ||
          link.originalUrl.startsWith('https://')
            ? link.originalUrl
            : `http://${link.originalUrl}`;
        res.redirect(redirectUrl);
        return { url: link.originalUrl, statusCode: 302 };
      } else {
        throw new NotFoundException('Link not found');
      }
    } catch (error) {
      throw new NotFoundException('Link not found');
    }
  }
}
