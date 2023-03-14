import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpException,
    Param,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import {ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';

import {CurrentUser} from '../common/decorators/current-user.decorator';
import {Roles} from '../common/decorators/roles.decorator';
import {PaginationDto} from '../common/dto/pagination.dto';
import {ServiceError} from '../common/service.error';

import {CreateUserDto} from './dto/create-user.dto';
import {ProfileDto} from './dto/profile.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserEntity} from './entities/user.entity';
import {UserDocument} from './schemas/user.schema';
import {ROLE, UserPagination} from './types';
import {UsersService} from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiQuery({required: false, name: 'show_inactive'})
    @ApiResponse({type: [UserEntity]})
    @Roles(ROLE.ADMIN)
    @Get()
    async getAll(@Query() query: UserPagination): Promise<PaginationDto<Array<UserDocument>>> {
        return await this.usersService.getAll(query);
    }

    @ApiParam({name: 'id', type: 'string'})
    @ApiResponse({type: UserEntity})
    @Roles(ROLE.ADMIN)
    @Get(':id')
    async getById(@Param('id') id: UserDocument['id']): Promise<UserDocument> {
        return await this.usersService.getById(id);
    }

    @ApiResponse({type: UserEntity})
    @UsePipes(new ValidationPipe({transform: true}))
    @Roles(ROLE.ADMIN)
    @Post()
    async create(@Body() user: CreateUserDto): Promise<UserDocument> {
        try {
            return await this.usersService.create(user);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @ApiParam({name: 'id', type: 'string'})
    @ApiResponse({type: UserEntity})
    @Roles(ROLE.ADMIN)
    @Patch(':id')
    async update(
        @Param('id') id: UserDocument['id'],
        @Body() updateUserDto: UpdateUserDto,
        @CurrentUser() currentUser: ProfileDto,
    ): Promise<UserDocument> {
        try {
            return await this.usersService.update(id, updateUserDto, currentUser);
        } catch (e) {
            if (e instanceof ServiceError) throw new HttpException(e.message, e.status);

            throw new BadRequestException(e.message);
        }
    }
}
