import {Injectable} from '@nestjs/common';

import {InjectModel} from '@nestjs/mongoose';

import {Model} from 'mongoose';

import {ServiceError} from '../common/service.error';

import {MediaService} from '../media/media.service';
import {ProfileDto} from '../users/dto/profile.dto';

import {CreatePostFilesDto} from './dto/create-post-files.dto';
import {CreatePostDto} from './dto/create-post.dto';

import {UpdatePostDto} from './dto/update-post.dto';
import {Post, PostDocument} from './schemas/post.schema';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, private filesService: MediaService) {}

    async create(
        createPostDto: CreatePostDto,
        files: CreatePostFilesDto,
        currentUser: ProfileDto,
    ): Promise<PostDocument> {
        const author = currentUser?.sub;

        if (!author) throw new ServiceError('Автор не определён');

        const {thumbnail: thumbnailData, media: mediaData} = files;

        const thumbnail = await this.filesService.create(thumbnailData[0]);

        const media = await Promise.all(mediaData.map(item => this.filesService.create(item)));

        const priority = await this.getPostPriority(createPostDto);

        const created = new this.postModel({...createPostDto, priority, author, thumbnail: thumbnail.id, media});
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
