/**
 * Created by ASTAKHOV A.A. on 09.03.2023
 */

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';

import {User} from '../../users/schemas/user.schema';
import {FILE_TYPES} from '../types';

export type FileDocument = File & Document;

@Schema({
    id: true,
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
})
export class File {
    @Prop({required: true, enum: FILE_TYPES})
    type: FILE_TYPES;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Post'})
    post: User;

    @Prop()
    length: number;

    @Prop()
    chunkSize: number;

    @Prop()
    filename: string;

    @Prop()
    md5: string;

    @Prop()
    contentType: string;
}

export const fileSchema = SchemaFactory.createForClass(File);
