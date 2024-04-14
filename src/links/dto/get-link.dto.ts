import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetLinkDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  readonly shortenedId: string;
}
