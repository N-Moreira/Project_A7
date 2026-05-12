import { Body, Controller, Get, Post } from '@nestjs/common';
import type { User } from './user.model';
import { UserService } from './user.service';



@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService) {}

    @Get()
    readAllUser(): Promise<any>{
        return this.userService.readUser();
    }

    @Post()
    async createUser(@Body() user: User): Promise<any>{
        var response = await this.userService.createUser(user);
        return{id: response}
    }
}