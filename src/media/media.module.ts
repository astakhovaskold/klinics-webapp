import {Module} from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose';

import {MediaService} from './media.service';
import {Media, mediaSchema} from './schemas/media.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: Media.name, schema: mediaSchema}])],
    providers: [MediaService],
    exports: [MediaService],
})
export class MediaModule {}
