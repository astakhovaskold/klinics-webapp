/**
 * Created by ASTAKHOV A.A. on 15.02.2023
 */

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

import {ROLE} from '../types';

export type UserDocument = User & Document;

@Schema({
    id: true,
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
})
export class User {
    @Prop({required: true, unique: true, maxlength: 64})
    username: string;

    @Prop({required: true, minlength: 6, maxlength: 64, select: false})
    password: string;

    @Prop({maxlength: 64})
    last_name: string;

    @Prop({maxlength: 64})
    first_name: string;

    @Prop({maxlength: 64})
    middle_name: string;

    @Prop({required: true, enum: ROLE})
    role: ROLE;

    @Prop({required: true, default: true})
    is_active: boolean;

    @Prop()
    refresh_token: string;
}

export const userSchema = SchemaFactory.createForClass(User);
