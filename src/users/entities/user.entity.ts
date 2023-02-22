/**
 * Created by ASTAKHOV A.A. on 16.02.2023
 */
import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsNotEmpty, IsOptional, MaxLength, MinLength} from 'class-validator';

import {ROLE} from '../../typings/enums';

export class UserEntity {
    @ApiProperty()
    @MaxLength(64, {message: 'Имя пользователя слишком длинное (макс. 64)'})
    @IsNotEmpty({message: 'Имя пользователя не указано'})
    readonly nickname: string;

    @ApiProperty()
    @MinLength(6, {
        message: 'Слишком короткий пароль (мин. 6 символов)',
    })
    @MaxLength(16, {message: 'Слишком длинный пароль (макс. 16 символов)'})
    @IsNotEmpty({message: 'Пароль не указан'})
    readonly password: string;

    @ApiProperty()
    @MaxLength(64, {message: 'Поле "Фамилия" слишком длинное (макс. 64)'})
    @IsNotEmpty({message: 'Фамилия не указана'})
    readonly last_name: string;

    @ApiProperty()
    @MaxLength(64, {message: 'Поле "Имя" слишком длинное (макс. 64)'})
    @IsNotEmpty({message: 'Имя не указано'})
    readonly first_name: string;

    @ApiProperty({nullable: true})
    @MaxLength(64, {message: 'Поле "Отчество" слишком длинное (макс. 64)'})
    @IsOptional()
    readonly middle_name?: string;

    @ApiProperty({enum: ROLE})
    @IsEnum(ROLE, {message: 'Указанная роль не найдена'})
    readonly role: ROLE;

    @ApiProperty()
    readonly is_active: boolean;
}
