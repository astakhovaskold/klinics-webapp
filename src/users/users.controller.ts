import {BadRequestException, Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';

import {ApiTags} from '@nestjs/swagger';

import {CreateUserDTO} from './dto/create-user.dto';
import {UserEntity} from './entities/user.entity';
import {User} from './schemas/user.schema';
import {UsersService} from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAll(): Promise<Array<UserEntity>> {
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
}
