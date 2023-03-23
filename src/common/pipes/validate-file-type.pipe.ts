/**
 * Created by ASTAKHOV A.A. on 29.03.2023
 */

import {PipeTransform, Injectable, BadRequestException} from '@nestjs/common';
import {Express} from 'express';

@Injectable()
export class ValidateFileTypePipe<T = Array<Express.Multer.File>> implements PipeTransform {
    async transform(files: T) {
        const fileKeys = Object.keys(files);

        const acceptImage = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
        const acceptVideo = ['video/mp4', 'video/webm'];

        const accept = [...acceptImage, ...acceptVideo];

        for (const key of fileKeys) {
            const [file] = files[key] as Array<Express.Multer.File>;

            if (!accept.includes(file.mimetype)) {
                throw new BadRequestException(
                    `Формат файла не поддерживается. Допустимые форматы: ${accept
                        .map(t => t.split('/')[1])
                        .join(', ')}`,
                );
            }
        }

        return files;
    }
}
