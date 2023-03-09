import {ApiProperty} from '@nestjs/swagger';

import {UserEntity} from '../../users/entities/user.entity';
import {POST_TYPES} from '../types';

export class PostEntity {
    @ApiProperty()
    readonly id?: string;

    @ApiProperty()
    is_active: boolean;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty({nullable: false, enum: POST_TYPES})
    type: POST_TYPES;

    @ApiProperty()
    priority: number;

    @ApiProperty({nullable: false})
    author: UserEntity['id'];

    @ApiProperty()
    files: [];
}
