/**
 * Created by ASTAKHOV A.A. on 28.02.2023
 */

import {ApiProperty} from '@nestjs/swagger';

import {UserEntity} from '../../users/entities/user.entity';

import {TokenDto} from './token.dto';

export class AccountDto extends TokenDto {
    @ApiProperty({type: UserEntity})
    user: Partial<UserEntity>;
}
