import {
    Body,
    ConflictException,
    NotFoundException,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    HttpCode,
    Put,
  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService ) {}

    @Get()
    async findAll(){
        return this.userService.findAll();

    }

    @Post()
    async create(@Body() body: CreateUser){
        try {
            return await this.userService.create(body)
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Task already exists');
              }
              throw error;
        }
    }

    @Get(":id")
    async findOne(@Param("id") id: string){
        const user = await this.userService.findOne(id);
        if (!user) throw new NotFoundException('user does not exist!');
        return user;
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: string){
        const user = await this.userService.delete(id);
        if (!user) throw new NotFoundException('user does not exist!');
        return user;
    }

    @Put(":id")
    async update(@Param('id') id: string, @Body() body: UpdateUserDto){
        const user = await this.userService.update(id, body);
        if (!user) throw new NotFoundException('user does not exist!');
        return user;
    }

}
