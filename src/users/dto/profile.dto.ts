/**
 * Created by ASTAKHOV A.A. on 14.03.2023
 */

import {ApiProperty} from '@nestjs/swagger';

import {ROLE} from '../types';

export class ProfileDto {
    @ApiProperty()
    sub: string;

    @ApiProperty({enum: ROLE})
    role: ROLE;

    @ApiProperty()
    iat: Date;

    @ApiProperty()
    exp: Date;
}
