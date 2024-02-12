import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://eduardourbina:9myniceHEXmEl4UA@cluster0.ekrq23s.mongodb.net/?retryWrites=true&w=majority'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
