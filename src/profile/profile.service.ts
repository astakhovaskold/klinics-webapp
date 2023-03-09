import {Injectable} from '@nestjs/common';

import {UserDocument} from '../users/schemas/user.schema';
import {UsersService} from '../users/users.service';

import {PasswordResetDto} from './dto/password-reset.dto';

@Injectable()
export class ProfileService {
    constructor(private usersService: UsersService) {}

    async passwordReset(id: UserDocument['id'], passwordResetDto: PasswordResetDto): Promise<UserDocument> {
        return this.usersService.update(id, passwordResetDto);
    }
}
