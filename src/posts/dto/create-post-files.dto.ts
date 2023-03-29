/**
 * Created by ASTAKHOV A.A. on 29.03.2023
 */

import {PickType} from '@nestjs/swagger';

import {CreatePostDto} from './create-post.dto';

export class CreatePostFilesDto extends PickType(CreatePostDto, ['thumbnail', 'media'] as const) {}
