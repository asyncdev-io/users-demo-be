import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthUserSchema } from '../schemas/userAuth';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuthUser.name, schema: AuthUserSchema }]),
    JwtModule.register({
      secret: "SECRET",
      signOptions: {expiresIn: "10h"}
    })
    // Importa otros módulos necesarios aquí
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
