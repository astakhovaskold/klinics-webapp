import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpException,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import {ApiTags} from '@nestjs/swagger';

import {AccessTokenGuard} from '../auth/guards/access-token.guard';
import {PaginationDto} from '../common/dto/pagination.dto';

import {ServiceError} from '../common/error';

import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserDocument} from './schemas/user.schema';
import {UsersService} from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AccessTokenGuard)
    @Get()
    async getAll(): Promise<PaginationDto<Array<UserDocument>>> {
        return await this.usersService.getAll();
    }

    @UseGuards(AccessTokenGuard)
    @Get(':id')
    async getById(@Param('id') id: UserDocument['id']): Promise<UserDocument> {
        return await this.usersService.getById(id);
    }

    @UseGuards(AccessTokenGuard)
    @Post()
    @UsePipes(new ValidationPipe({transform: true}))
    async create(@Body() user: CreateUserDto): Promise<UserDocument> {
        try {
            return await this.usersService.create(user);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @UseGuards(AccessTokenGuard)
    @Patch(':id')
    async update(@Param('id') id: UserDocument['id'], @Body() updateUserDto: UpdateUserDto): Promise<UserDocument> {
        try {
            return await this.usersService.update(id, updateUserDto);
        } catch (e) {
            if (e instanceof ServiceError) throw new HttpException(e.message, e.status);

            throw new BadRequestException(e.message);
        }
    }
}
