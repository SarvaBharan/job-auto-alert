import { IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobAlertDto {
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}