import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import {ApiTags} from '@nestjs/swagger';

import {PaginationDto} from '../dto/pagination.dto';

import {CreateUserDTO} from './dto/create-user.dto';
import {GetUserDTO} from './dto/get-user.dto';
import {UserEntity} from './entities/user.entity';
import {User} from './schemas/user.schema';
import {UsersService} from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAll(): Promise<PaginationDto<Array<GetUserDTO>>> {
        return await this.usersService.getAll();
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true}))
    async create(@Body() user: CreateUserDTO): Promise<User> {
        try {
            return await this.usersService.create(user);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<UserEntity> {
        return this.usersService.remove(id);
    }
}
