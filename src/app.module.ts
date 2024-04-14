import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinksModule } from './links/modules/links.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://danyava13:password_mongodb13@cluster0.e5yd52m.mongodb.net/conboai?retryWrites=true&w=majority&appName=Cluster0',
    ),
    LinksModule,
  ],
})
export class AppModule {}
