/**
 * Created by ASTAKHOV A.A. on 24.02.2023
 */

import {ApiProperty} from '@nestjs/swagger';

export class TokenDto {
    @ApiProperty()
    access_token: string;

    @ApiProperty()
    refresh_token: string;
}
