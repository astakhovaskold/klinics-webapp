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
    UploadedFile,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
} from '@nestjs/common';

import {FileInterceptor} from '@nestjs/platform-express';
import {ApiConsumes, ApiResponse, ApiTags} from '@nestjs/swagger';

import {ApiImplicitFile} from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

import {Express} from 'express';

import {CurrentUser} from '../common/decorators/current-user.decorator';
import {Roles} from '../common/decorators/roles.decorator';

import {ServiceError} from '../common/service.error';
import {ProfileDto} from '../users/dto/profile.dto';
import {ROLE} from '../users/types';

import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {PostEntity} from './entities/post.entity';
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

    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({name: 'preview'})
    @ApiResponse({type: PostEntity})
    @UsePipes(new ValidationPipe({transform: true}))
    @UseInterceptors(FileInterceptor('preview'))
    @Roles(ROLE.MODERATOR)
    @Post()
    async create(
        @Body() createPostDto: CreatePostDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({maxSize: 16 * 1024 * 1024}),
                    new FileTypeValidator({fileType: /image\/(jpg|jpeg|png|webp|gif)$|video\/(mp4|webm)$/}),
                ],
            }),
        )
        thumbnail: Express.Multer.File,
        @CurrentUser() currentUser: ProfileDto,
    ): Promise<PostDocument> {
        try {
            return await this.postsService.create(createPostDto, thumbnail, currentUser);
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
