import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PraticaModule } from './pratica/pratica.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://nicolasteste:nic123456@ac-izsvkne-shard-00-00.yajkods.mongodb.net:27017,ac-izsvkne-shard-00-01.yajkods.mongodb.net:27017,ac-izsvkne-shard-00-02.yajkods.mongodb.net:27017/?ssl=true&replicaSet=atlas-2jlfa5-shard-0&authSource=admin&appName=Cluster0'
    ),

    PraticaModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}