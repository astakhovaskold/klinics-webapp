import {Module} from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose';

import {NestjsFormDataModule} from 'nestjs-form-data';

import {MediaModule} from '../media/media.module';

import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';
import {Post, postSchema} from './schemas/post.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: Post.name, schema: postSchema}]), NestjsFormDataModule, MediaModule],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
