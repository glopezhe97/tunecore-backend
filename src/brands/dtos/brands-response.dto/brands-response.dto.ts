import { IsString } from 'class-validator';
export class BrandsResponseDto {
  @IsString()
  public name: string;
}
