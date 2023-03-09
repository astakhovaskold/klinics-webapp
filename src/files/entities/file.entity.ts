/**
 * Created by ASTAKHOV A.A. on 09.03.2023
 */

import {ApiProperty} from '@nestjs/swagger';

import {PostEntity} from '../../posts/entities/post.entity';
import {FILE_TYPES} from '../types';

import {BaseFileEntity} from './base-file.entity';

export class FileEntity extends BaseFileEntity {
    @ApiProperty()
    readonly id?: string;

    @ApiProperty({nullable: false, enum: FILE_TYPES})
    type: FILE_TYPES;

    @ApiProperty({nullable: false})
    post: PostEntity['id'];
}
