import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CommonEntityDto } from '../../common/dto';
import { RestaurantRoleInterface } from '../interfaces';

export class RestaurantRoleDto extends CommonEntityDto implements RestaurantRoleInterface {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  restaurantId!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  roleId!: string;
}