import {ApiProperty} from '@nestjs/swagger';
import {Transform, TransformFnParams} from 'class-transformer';

import {IsEnum, IsNotEmpty, MaxLength} from 'class-validator';

import {UserEntity} from '../../users/entities/user.entity';
import {POST_TYPES} from '../types';

const textWhitespaceRegexp = /^ +| +$|( ) +/g;

export class PostEntity {
    @ApiProperty()
    readonly id?: string;

    @ApiProperty()
    is_active: boolean;

    @ApiProperty()
    @Transform(({value}: TransformFnParams) => value?.trim().replace(textWhitespaceRegexp, ' '))
    @MaxLength(128, {message: 'Поле "Название" слишком длинное (макс. 128)'})
    @IsNotEmpty({message: 'Название не указано'})
    title: string;

    @ApiProperty()
    @Transform(({value}: TransformFnParams) => value?.trim().replace(textWhitespaceRegexp, ' '))
    @MaxLength(1024, {message: 'Поле "Описание" слишком длинное (макс. 1024)'})
    description: string;

    @ApiProperty({nullable: false, enum: POST_TYPES})
    @IsEnum(POST_TYPES, {message: 'Указанный тип записи не найден'})
    @IsNotEmpty({message: 'Тип не указан'})
    type: POST_TYPES;

    @ApiProperty()
    priority: number;

    @ApiProperty({nullable: false})
    author: UserEntity['id'];

    @ApiProperty()
    files: [];

    @ApiProperty()
    preview: string;
}
