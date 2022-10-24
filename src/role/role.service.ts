import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-Role.dto';
import { UpdateRoleDto } from './dto/update-Role.dto';
import { Role } from './entities/Role.entity';
import { plainToInstance } from 'class-transformer';
import { RoleDto } from './dto/Role.dto';


@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private repo: Repository<Role>
  ){}

  public async create(createRole: CreateRoleDto): Promise<RoleDto> {
    try{
      const role = this.repo.create(createRole);
      const dbRole = await this.repo.save(role);
      return plainToInstance(RoleDto, dbRole);
    }catch(e){
      throw new InternalServerErrorException('Error trying to create a user')
    }
  }
  public async findAll(): Promise<RoleDto[]> {
    const roles = await this.repo.find({
      //relations: ['RoleRoles'],
    });
    return plainToInstance(RoleDto, roles);
  }

  private async findById(id: string): Promise<Role> {
    // Get without relationships
    const role = await this.repo.findOneBy({
      id,
    });
    // const user = await this.repo.findOne({
    //   where: { id },
    //   relations: ['roles'],
    // });
    if (!role) throw new NotFoundException();
    return role;
  }

  public async findOne(id: string): Promise<RoleDto> {
    const role = await this.findById(id);
    return plainToInstance(RoleDto, role);
  }

  public async update(
    id: string,
    updateRole: UpdateRoleDto
  ): Promise<RoleDto> {
    const role = await this.findById(id);
    const newRole: Role = {
      ...role,
      ...updateRole,
    };
    this.repo.save(newRole);
    return plainToInstance(RoleDto, newRole);
  }

  public async remove(id: string): Promise<void> {
    const role = await this.findById(id);
    await this.repo.remove(role);
  }
}

