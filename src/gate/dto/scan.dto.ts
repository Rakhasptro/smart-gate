import { IsString } from 'class-validator';

export class ScanDto {
  @IsString()
  uid!: string;
}