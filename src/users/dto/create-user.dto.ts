/**
 * Created by ASTAKHOV A.A. on 05.02.2023
 */

import {ApiProperty, OmitType} from '@nestjs/swagger';

import {IsNotEmpty} from 'class-validator';

import {Match} from '../../decorators/match.decorator';
import {UserEntity} from '../entities/user.entity';

export class CreateUserDTO extends OmitType(UserEntity, ['is_active'] as const) {
    @ApiProperty()
    @Match(CreateUserDTO, user => user.password, {message: 'Пароли не совпадают'})
    @IsNotEmpty({message: 'Потверждение пароля не указано'})
    readonly confirm_password: string;
}
