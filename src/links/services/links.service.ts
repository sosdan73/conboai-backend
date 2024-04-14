import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Link } from '../schemas/link.schema';
import { CreateLinkDto } from '../dto/create-link.dto';

@Injectable()
export class LinksService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}

  private generateShortenedId(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortenedId = '';
    for (let i = 0; i < 6; i++) {
      shortenedId += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return shortenedId;
  }
  async findByOriginalUrl(originalUrl: string): Promise<any> {
    let link = await this.linkModel.findOne({ originalUrl }).exec();
    if (link) {
      return {
        result: link,
        message: 'Link was shorted!',
        type: 'success',
      };
    }

    const shortenedId = this.generateShortenedId();
    const createLinkDto: CreateLinkDto = { originalUrl, shortenedId };
    link = await this.create(createLinkDto);

    return link;
  }

  async findByShortenedId(shortenedId: string): Promise<any> {
    const link = await this.linkModel.findOne({ shortenedId }).exec();
    if (!link) {
      throw new NotFoundException('Link not found');
    }
    return link;
  }

  async create(createLinkDto: CreateLinkDto): Promise<any> {
    const newLink = new this.linkModel(createLinkDto);
    await newLink.save();

    return {
      result: newLink,
      message: 'Link was shorted!',
      type: 'success',
    };
  }
}
