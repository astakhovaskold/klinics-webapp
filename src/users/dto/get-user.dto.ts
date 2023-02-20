/**
 * Created by ASTAKHOV A.A. on 05.02.2023
 */

import {OmitType} from '@nestjs/swagger';

import {UserEntity} from '../entities/user.entity';

export class GetUserDTO extends OmitType(UserEntity, ['password'] as const) {}
