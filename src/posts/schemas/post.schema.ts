/**
 * Created by ASTAKHOV A.A. on 09.03.2023
 */

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';

import {User} from '../../users/schemas/user.schema';
import {POST_TYPES} from '../types';

export type PostDocument = Post & Document;

@Schema({
    id: true,
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
})
export class Post {
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({required: true, enum: POST_TYPES})
    type: POST_TYPES;

    @Prop({required: true})
    priority: number;

    @Prop({required: true, type: MongooseSchema.Types.ObjectId, ref: 'User'})
    author: User;

    @Prop({required: true, default: true})
    is_active: boolean;
}

export const postSchema = SchemaFactory.createForClass(Post);
