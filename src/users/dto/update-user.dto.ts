/**
 * Created by ASTAKHOV A.A. on 05.02.2023
 */

import {ApiProperty, PartialType} from '@nestjs/swagger';

import {ValidateIf} from 'class-validator';

import {Match} from '../../common/decorators/match.decorator';

import {CreateUserDto} from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @Match(UpdateUserDto, user => user.password, {message: 'Пароли не совпадают'})
    @ValidateIf(user => !!user.password)
    confirm_password?: string;

    @ApiProperty({required: false})
    refresh_token?: string;
}
