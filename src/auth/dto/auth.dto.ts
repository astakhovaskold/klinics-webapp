/**
 * Created by ASTAKHOV A.A. on 24.02.2023
 */

import {ApiProperty} from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}
