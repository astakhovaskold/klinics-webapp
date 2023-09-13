import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import type {TransformFnParams} from 'class-transformer';

import {IsEnum, IsNotEmpty, IsOptional, MaxLength} from 'class-validator';

import {Express} from 'express';

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
    @MaxLength(128, {message: 'Поле "Наименование" слишком длинное (макс. 128)'})
    @IsNotEmpty({message: 'Наименование не указано'})
    title: string;

    @ApiProperty({required: false})
    @Transform(({value}: TransformFnParams) => value?.trim().replace(textWhitespaceRegexp, ' '))
    @MaxLength(3072, {message: 'Поле "Описание" слишком длинное (макс. 3072)'})
    @IsOptional()
    description?: string;

    @ApiProperty({nullable: false, enum: POST_TYPES})
    @IsEnum(POST_TYPES, {message: 'Указанный тип записи не найден'})
    @IsNotEmpty({message: 'Тип не указан'})
    type: POST_TYPES;

    @ApiProperty({required: false})
    priority: number;

    @ApiProperty({required: false, type: 'string', nullable: false})
    author: UserEntity['id'];

    @ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
        nullable: true,
    })
    thumbnail: Array<Express.Multer.File>;

    @ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
        nullable: true,
    })
    media: Array<Express.Multer.File>;
}
