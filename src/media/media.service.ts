import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import {Express} from 'express';
import {Model} from 'mongoose';

import {Media, MediaDocument} from './schemas/media.schema';

@Injectable()
export class MediaService {
    constructor(@InjectModel(Media.name) private fileModel: Model<MediaDocument>) {}

    async create(media: Express.Multer.File): Promise<MediaDocument> {
        const {size, mimetype, originalname} = media;
        const buffer = media ? media.buffer : null;

        const current = await this.fileModel.create({size, filename: originalname, buffer, content_type: mimetype});
        return current;
    }
}
