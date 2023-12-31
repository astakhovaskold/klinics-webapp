/**
 * Created by ASTAKHOV A.A. on 09.03.2023
 */

import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsNotEmpty, IsOptional, MaxLength, MinLength} from 'class-validator';

import {Match} from '../../common/decorators/match.decorator';
import {ROLE} from '../types';

export class UserEntity {
    @ApiProperty()
    readonly id?: string;

    @ApiProperty()
    @MaxLength(64, {message: 'Логин слишком длинный (макс. 64)'})
    @IsNotEmpty({message: 'Логин не указан'})
    username: string;

    @ApiProperty()
    @MinLength(6, {
        message: 'Слишком короткий пароль (мин. 6 символов)',
    })
    @MaxLength(16, {message: 'Слишком длинный пароль (макс. 16 символов)'})
    @IsNotEmpty({message: 'Пароль не указан'})
    password: string;

    @ApiProperty()
    @Match(UserEntity, user => user.password, {message: 'Пароли не совпадают'})
    @IsNotEmpty({message: 'Потверждение пароля не указано'})
    confirm_password: string;

    @ApiProperty()
    @MaxLength(64, {message: 'Поле "Фамилия" слишком длинное (макс. 64)'})
    @IsNotEmpty({message: 'Фамилия не указана'})
    last_name: string;

    @ApiProperty()
    @MaxLength(64, {message: 'Поле "Имя" слишком длинное (макс. 64)'})
    @IsNotEmpty({message: 'Имя не указано'})
    first_name: string;

    @ApiProperty({required: false, nullable: true})
    @MaxLength(64, {message: 'Поле "Отчество" слишком длинное (макс. 64)'})
    @IsOptional()
    middle_name?: string;

    @ApiProperty({enum: ROLE})
    @IsEnum(ROLE, {message: 'Указанная роль не найдена'})
    role: ROLE;

    @ApiProperty()
    is_active: boolean;
}
