import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsUrl()
  readonly originalUrl: string;

  @IsNotEmpty()
  readonly shortenedId?: string;
}
