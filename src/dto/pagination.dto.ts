/**
 * Created by ASTAKHOV A.A. on 20.02.2023
 */

import {ApiProperty} from '@nestjs/swagger';

export class PaginationDto<T> {
    @ApiProperty()
    content: T;

    @ApiProperty()
    total_pages: number;

    @ApiProperty()
    total_items: number;
}
