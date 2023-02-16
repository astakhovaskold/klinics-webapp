import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {Model} from 'mongoose';

import {CreateUserDTO} from './dto/create-user.dto';
import {UserEntity} from './entities/user.entity';
import {User, UserDocument} from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAll(): Promise<Array<UserEntity>> {
        return this.userModel.find().sort({nickname: 'asc'});
    }

    async create(product: CreateUserDTO): Promise<User> {
        const {nickname, password} = product;

        const candidate = await this.userModel.exists({nickname});

        if (candidate) throw new Error('Пользователь с таким nickname уже существует');

        const hash: CreateUserDTO['password'] = await bcrypt.hash(password, 10);

        const created = new this.userModel({...product, password: hash});
        return created.save();
    }
}
