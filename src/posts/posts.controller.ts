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
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';

import {FileFieldsInterceptor} from '@nestjs/platform-express';
import {ApiConsumes, ApiResponse, ApiTags} from '@nestjs/swagger';

import {CurrentUser} from '../common/decorators/current-user.decorator';
import {Roles} from '../common/decorators/roles.decorator';

import {ValidateFileSizePipe} from '../common/pipes/validate-file-size.pipe';
import {ValidateFileTypePipe} from '../common/pipes/validate-file-type.pipe';
import {ServiceError} from '../common/service.error';
import {ProfileDto} from '../users/dto/profile.dto';
import {ROLE} from '../users/types';

import {CreatePostFilesDto} from './dto/create-post-files.dto';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {PostEntity} from './entities/post.entity';
import {PostsService} from './posts.service';

import {PostDocument} from './schemas/post.schema';
import {PostFileList} from './types';

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

    @ApiConsumes('multipart/form-data')
    @ApiResponse({type: PostEntity})
    @UsePipes(new ValidationPipe({transform: true}))
    @UseInterceptors(
        FileFieldsInterceptor([
            {name: 'thumbnail', maxCount: 1},
            {name: 'media', maxCount: 15},
        ]),
    )
    @Roles(ROLE.MODERATOR)
    @Post()
    async create(
        @Body() createPostDto: CreatePostDto,
        @UploadedFiles(new ValidateFileSizePipe<CreatePostFilesDto>(), new ValidateFileTypePipe<CreatePostFilesDto>())
        files: CreatePostFilesDto,
        @CurrentUser() currentUser: ProfileDto,
    ): Promise<PostDocument> {
        try {
            return await this.postsService.create(createPostDto, files, currentUser);
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
