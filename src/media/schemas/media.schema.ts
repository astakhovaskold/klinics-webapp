/**
 * Created by ASTAKHOV A.A. on 09.03.2023
 */

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type MediaDocument = Media & Document;

@Schema({
    id: true,
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
})
export class Media {
    @Prop({required: true})
    size: number;

    @Prop({required: true})
    filename: string;

    @Prop({required: true})
    content_type: string;

    @Prop({required: true, type: 'Buffer'})
    buffer: BinaryData;
}

export const mediaSchema = SchemaFactory.createForClass(Media);
