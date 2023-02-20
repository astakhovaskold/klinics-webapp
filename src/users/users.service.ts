import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {Model} from 'mongoose';

import {PaginationDto} from '../dto/pagination.dto';

import {CreateUserDTO} from './dto/create-user.dto';
import {GetUserDTO} from './dto/get-user.dto';
import {UserEntity} from './entities/user.entity';
import {User, UserDocument} from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAll(): Promise<PaginationDto<Array<GetUserDTO>>> {
        const size = 25;

        const content = await this.userModel.find().limit(size).sort({nickname: 'asc'});
        const total_items = await this.userModel.count();
        const total_pages = Math.ceil(total_items / size);

        return {content, total_pages, total_items};
    }

    async create(product: CreateUserDTO): Promise<User> {
        const {nickname, password} = product;

        const candidate = await this.userModel.exists({nickname});

        if (candidate) throw new Error('Пользователь с таким nickname уже существует');

        const hash: CreateUserDTO['password'] = await bcrypt.hash(password, 10);

        const created = new this.userModel({...product, password: hash});
        return created.save();
    }

    async remove(id: string): Promise<UserEntity> {
        return this.userModel.findByIdAndUpdate(id, {is_active: false}, {new: true});
    }
}
