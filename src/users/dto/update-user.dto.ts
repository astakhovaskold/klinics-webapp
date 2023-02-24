/**
 * Created by ASTAKHOV A.A. on 05.02.2023
 */

import {ApiProperty, PartialType} from '@nestjs/swagger';

import {IsNotEmpty, ValidateIf} from 'class-validator';

import {Match} from '../../common/decorators/match.decorator';

import {CreateUserDto} from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @Match(UpdateUserDto, user => user.password, {message: 'Пароли не совпадают'})
    @IsOptional()
    readonly confirm_password?: string;
}
