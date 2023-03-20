import {Injectable} from '@nestjs/common';

import {InjectModel} from '@nestjs/mongoose';

import {Express} from 'express';
import {Model} from 'mongoose';

import {ServiceError} from '../common/service.error';

import {MediaService} from '../media/media.service';
import {ProfileDto} from '../users/dto/profile.dto';

import {CreatePostDto} from './dto/create-post.dto';

import {UpdatePostDto} from './dto/update-post.dto';
import {Post, PostDocument} from './schemas/post.schema';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, private filesService: MediaService) {}

    async create(
        createPostDto: CreatePostDto,
        thumbnailData: Express.Multer.File,
        currentUser: ProfileDto,
    ): Promise<PostDocument> {
        const author = currentUser?.sub;

        if (!author) throw new ServiceError('Автор не определён');

        const thumbnail = await this.filesService.create(thumbnailData);

        const priority = await this.getPostPriority(createPostDto);

        const created = new this.postModel({...createPostDto, priority, author, preview: thumbnail.id});
        return created.save();
    }

    getAll() {
        return `This action returns all posts`;
    }

    getById(id: string) {
        return `This action returns a #${id} post`;
    }

    update(id: string, updatePostDto: UpdatePostDto) {
        return `This action updates a #${id} post as ${JSON.stringify(updatePostDto)}`;
    }

    remove(id: string) {
        return `This action removes a #${id} post`;
    }

    async getPostPriority(createPostDto: CreatePostDto) {
        const {priority} = createPostDto;

        const maxPriorityPost = await this.postModel.findOne().sort({priority: 'desc'}).limit(1);
        const priorityIncrement = maxPriorityPost ? maxPriorityPost.priority + 1 : 1;

        return Number.isFinite(priority) ? priority : priorityIncrement;
    }
}
