import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {Request} from 'express';
import {Model} from 'mongoose';

import {PaginationDto} from '../common/dto/pagination.dto';

import {ServiceError} from '../common/service.error';

import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User, UserDocument} from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAll(): Promise<PaginationDto<Array<UserDocument>>> {
        const size = 25;

        const content = await this.userModel.find().limit(size).sort({username: 'asc'});
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
        currentUser?: Request['user'] & {sub: string},
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
