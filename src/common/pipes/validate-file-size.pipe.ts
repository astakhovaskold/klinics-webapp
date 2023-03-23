/**
 * Created by ASTAKHOV A.A. on 29.03.2023
 */

import {PipeTransform, Injectable, BadRequestException} from '@nestjs/common';
import {Express} from 'express';

@Injectable()
export class ValidateFileSizePipe<T = Array<Express.Multer.File>> implements PipeTransform {
    async transform(files: T) {
        const fileKeys = Object.keys(files);

        const allowedFileSize = 16 * 1024 * 1024; // 16 MB

        for (const key of fileKeys) {
            const [file] = files[key] as Array<Express.Multer.File>;

            if (file.size > allowedFileSize) {
                throw new BadRequestException(`Файл не должен превышать ${allowedFileSize / 1024 / 1024} МБ`);
            }
        }

        return files;
    }
}
