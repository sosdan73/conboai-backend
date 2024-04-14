import { Types } from 'mongoose';

export interface Link {
  _id: Types.ObjectId;
  originalUrl: string;
  shortenedId: string;
}
