import {Module} from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose';

import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';
import {Post, postSchema} from './schemas/post.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: Post.name, schema: postSchema}])],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
