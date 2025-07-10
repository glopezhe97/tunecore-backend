import { IsString } from 'class-validator';
export class SubcategoryResponseDto {
  @IsString()
  public name: string;

  @IsString()
  public image: string;
}
