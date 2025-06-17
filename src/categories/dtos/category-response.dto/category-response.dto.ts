import { IsString } from 'class-validator';
export class CategoryResponseDto {
  @IsString()
  public name: string;
}
