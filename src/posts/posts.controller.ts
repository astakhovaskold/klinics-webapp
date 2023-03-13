import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    BadRequestException,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import {ApiTags} from '@nestjs/swagger';

import {CurrentUser} from '../common/decorators/current-user.decorator';
import {Roles} from '../common/decorators/roles.decorator';

import {ServiceError} from '../common/service.error';
import {ROLE, UserFromRequest} from '../users/types';

import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {PostsService} from './posts.service';

import {PostDocument} from './schemas/post.schema';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    findAll() {
        return this.postsService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.getById(id);
    }

    @Roles(ROLE.MODERATOR)
    @UsePipes(new ValidationPipe({transform: true}))
    @Post()
    async create(
        @Body() createPostDto: CreatePostDto,
        @CurrentUser() currentUser: UserFromRequest,
    ): Promise<PostDocument> {
        try {
            return await this.postsService.create(createPostDto, currentUser);
        } catch (e) {
            if (e instanceof ServiceError) throw new HttpException(e.message, e.status);

            throw new BadRequestException(e.message);
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(id);
    }
}
