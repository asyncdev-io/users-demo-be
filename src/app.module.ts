import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://eduardourbina:9myniceHEXmEl4UA@cluster0.ekrq23s.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
