import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { AuthUser } from 'src/schemas/userAuth';
import { CreateAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel(AuthUser.name) private readonly AuthUserModel: Model<AuthUser>,
    private jwtService: JwtService
  ) {}

  async register(userObject: CreateAuthDto): Promise<AuthUser> {
    try {
      const { email, password } = userObject;

      // Check if the user already exists in the database
      const existingUser = await this.AuthUserModel.findOne({ email });
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      // Hash the password
      const hashPassword = await hash(password, 10);

      // Create a new user 
      const newUser = new this.AuthUserModel({ ...userObject, password: hashPassword });
      return await newUser.save();

    } catch (error) {
      throw new Error('Error while registering user');
    }
  }

  async login(userObject: LoginAuthDto) {
    
    //Get the email and password from the body
    const {email, password} = userObject
    const findUser = await this.AuthUserModel.findOne({email})

    //check if users exists logic
    if(!findUser) throw new HttpException("USER NOT FOUND", 404);

    const checkPassword = await compare(password, findUser.password);

    if(!checkPassword) throw new HttpException("PASSWORD INVALID", 403);

    //Generate Token logic
    const payload = { sub: findUser._id, username: findUser.name, email: findUser.email };

  
    return {
      findUser,
      access_token: await this.jwtService.signAsync(payload)
    }
    
  }
}
