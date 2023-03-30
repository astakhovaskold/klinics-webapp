/**
 * Created by ASTAKHOV A.A. on 09.03.2023
 */

import {Buffer} from 'buffer';

import {ApiProperty} from '@nestjs/swagger';

export class MediaEntity {
    @ApiProperty()
    readonly id?: string;

    @ApiProperty()
    size: number;

    @ApiProperty()
    filename: string;

    @ApiProperty({required: true, nullable: false})
    buffer: Buffer;

    @ApiProperty({nullable: false})
    content_type: string;
}
