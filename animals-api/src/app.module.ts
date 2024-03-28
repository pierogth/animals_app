import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/test'),
    AnimalsModule,
  ],
})
export class AppModule {}
