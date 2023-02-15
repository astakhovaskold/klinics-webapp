import {Module} from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';

@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DATABASE}`,
        ),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
