/**
 * Created by ASTAKHOV A.A. on 05.02.2023
 */

import {ApiProperty} from '@nestjs/swagger';

import {IsEnum, IsNotEmpty, IsOptional, MaxLength, MinLength} from 'class-validator';

import {Match} from '../../common/decorators/match.decorator';
import {ROLE} from '../types';

export class CreateUserDto {
    @ApiProperty()
    readonly id?: string;

    @ApiProperty()
    @MaxLength(64, {message: 'Имя пользователя слишком длинное (макс. 64)'})
    @IsNotEmpty({message: 'Имя пользователя не указано'})
    username: string;

    @ApiProperty()
    @MinLength(6, {
        message: 'Слишком короткий пароль (мин. 6 символов)',
    })
    @MaxLength(16, {message: 'Слишком длинный пароль (макс. 16 символов)'})
    @IsNotEmpty({message: 'Пароль не указан'})
    password: string;

    @ApiProperty()
    @Match(CreateUserDto, user => user.password, {message: 'Пароли не совпадают'})
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

    @ApiProperty({nullable: true})
    @MaxLength(64, {message: 'Поле "Отчество" слишком длинное (макс. 64)'})
    @IsOptional()
    middle_name?: string;

    @ApiProperty({enum: ROLE})
    @IsEnum(ROLE, {message: 'Указанная роль не найдена'})
    role: ROLE;

    @ApiProperty()
    is_active: boolean;
}
