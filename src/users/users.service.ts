import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {Request} from 'express';
import {Model, SortOrder} from 'mongoose';

import {PaginationDto} from '../common/dto/pagination.dto';

import {ServiceError} from '../common/service.error';

import {PaginationParams} from '../common/types';

import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User, UserDocument} from './schemas/user.schema';
import {UserFromRequest} from './types';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAll(query?: PaginationParams): Promise<PaginationDto<Array<UserDocument>>> {
        const {page = 0, size = 25, sort} = query;

        const arrayFromSortQuery = sort.split(',');
        const sortArray: Array<[string, SortOrder]> = [];

        if (Array.isArray(arrayFromSortQuery)) {
            for (const item of arrayFromSortQuery) {
                if (!item) continue;

                const sortOrder: SortOrder = item.charAt(0) === '-' ? 'desc' : 'asc';
                const sortName = item.replace('-', '');

                sortArray.push([sortName, sortOrder]);
            }
        }

        const content = await this.userModel.find().skip(+page).limit(+size).sort(sortArray);
        const total_items = await this.userModel.count();
        const total_pages = Math.ceil(total_items / size);

        return {content, total_pages, total_items};
    }

    async getById(id: UserDocument['id']): Promise<UserDocument> {
        return this.userModel.findById(id);
    }

    async getByUsername(username: UserDocument['username']): Promise<UserDocument> {
        return this.userModel.findOne({username: username}).select('+password +refresh_token').exec();
    }

    async update(
        id: UserDocument['id'],
        updateUserDto: UpdateUserDto,
        currentUser?: Request['user'] & UserFromRequest,
    ): Promise<UserDocument> {
        const isCurrentUser = currentUser ? id === currentUser.sub : false;

        if (isCurrentUser) {
            if (updateUserDto?.is_active === false) throw new ServiceError('Невозможно деактивировать свой профиль');
        }

        const {password, ...user} = updateUserDto;

        const hash = typeof password !== 'undefined' ? await bcrypt.hash(password, 10) : undefined;

        Object.assign(user, hash ? {password: hash} : {});

        return this.userModel.findByIdAndUpdate(id, user, {new: true}).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const {username, password} = createUserDto;

        const candidate = await this.userModel.exists({username});

        if (candidate) throw new ServiceError('Пользователь с таким username уже существует');

        const hash: CreateUserDto['password'] = await bcrypt.hash(password, 10);

        const created = new this.userModel({...createUserDto, password: hash});
        return created.save();
    }
}
