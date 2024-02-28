import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { userInfo } from 'os';
import { LoginAuthDto } from './dto/login-auth.dto';


@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  registerUser(@Body() userObject: CreateAuthDto){
    return this.authService.register(userObject)
  }

  @Post("login")
  loginUser(@Body() userObject: LoginAuthDto ){
    return this.authService.login(userObject)
  }
}
