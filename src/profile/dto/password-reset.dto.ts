/**
 * Created by ASTAKHOV A.A. on 09.03.2023
 */

import {PickType} from '@nestjs/swagger';

import {UpdateUserDto} from '../../users/dto/update-user.dto';

export class PasswordResetDto extends PickType(UpdateUserDto, ['password', 'confirm_password'] as const) {}
