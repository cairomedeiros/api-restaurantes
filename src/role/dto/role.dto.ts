import { RoleInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CommonEntityDto } from '../../common/dto';

@Exclude()
export class RoleDto extends CommonEntityDto implements RoleInterface {
  @ApiProperty({
    type: 'string',
    description: 'Username',
  })
  @IsString()
  @Expose()
  name!: string;
}