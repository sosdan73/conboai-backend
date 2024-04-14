import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'links' })
export class Link extends Document {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  shortenedId: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
