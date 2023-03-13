import {Injectable} from '@nestjs/common';

import {InjectModel} from '@nestjs/mongoose';

import {Model} from 'mongoose';

import {ServiceError} from '../common/service.error';

import {UserFromRequest} from '../users/types';

import {CreatePostDto} from './dto/create-post.dto';

import {Post, PostDocument} from './schemas/post.schema';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

    async create(createPostDto: CreatePostDto, currentUser: UserFromRequest): Promise<PostDocument> {
        const author = currentUser?.sub;

        if (!author) throw new ServiceError('Автор не определён');

        const {priority: priorityFromDto} = createPostDto;

        const maxPriorityPost = await this.postModel.findOne().sort({priority: 'desc'}).limit(1);
        const priorityIncrement = maxPriorityPost ? maxPriorityPost.priority + 1 : 1;

        const priority = Number.isFinite(priorityFromDto) ? priorityFromDto : priorityIncrement;

        const created = new this.postModel({...createPostDto, priority, author});
        return created.save();
    }

    getAll() {
        return `This action returns all posts`;
    }

    getById(id: string) {
        return `This action returns a #${id} post`;
    }

    update(id: string) {
        return `This action updates a #${id} post`;
    }

    remove(id: string) {
        return `This action removes a #${id} post`;
    }
}
