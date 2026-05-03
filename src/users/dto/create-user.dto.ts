import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @Length(16, 16)
  nik: string;

  @IsString()
  address: string;
}