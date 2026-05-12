import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb+srv://nicolasteste:<db_nicolasteste1>@WebMobilw.yajkods.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
