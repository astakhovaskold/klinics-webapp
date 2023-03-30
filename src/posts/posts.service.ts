import {Injectable} from '@nestjs/common';

import {InjectModel} from '@nestjs/mongoose';

import {Model, SortOrder} from 'mongoose';

import {PaginationDto} from '../common/dto/pagination.dto';
import {ServiceError} from '../common/service.error';

import {MediaService} from '../media/media.service';
import {ProfileDto} from '../users/dto/profile.dto';

import {CreatePostFilesDto} from './dto/create-post-files.dto';
import {CreatePostDto} from './dto/create-post.dto';

import {UpdatePostDto} from './dto/update-post.dto';
import {Post, PostDocument} from './schemas/post.schema';
import {PostPagination} from './types';

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

    async getAll(query?: PostPagination): Promise<PaginationDto<Array<PostDocument>>> {
        const {page = 0, size = 25, sort, ...filter} = query;

        const arrayFromSortQuery = sort ? sort.split(',') : null;
        const sortArray: Array<[string, SortOrder]> = [];

        if (Array.isArray(arrayFromSortQuery)) {
            for (const item of arrayFromSortQuery) {
                if (!item) continue;

                const sortOrder: SortOrder = item.charAt(0) === '-' ? 'desc' : 'asc';
                const sortName = item.replace('-', '');

                sortArray.push([sortName, sortOrder]);
            }
        }

        const {show_inactive} = filter;
        const is_active = show_inactive === 'false';

        const content = await this.postModel
            .find(Object.keys(filter).length ? {is_active} : undefined)
            .populate(['thumbnail', 'media'])
            .skip(+page)
            .limit(+size)
            .sort(sortArray);

        const total_items = await this.postModel.count();
        const total_pages = Math.ceil(total_items / size);

        return {content, total_pages, total_items};
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
