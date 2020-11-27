import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service'
import { promises } from 'fs';
import { from } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }
    @Get('getuser')
    async getuser() {
        return this.userService.getUser();
    }
    @Post()
    async addUser(
        @Body() body: UsersService
    ) {
        return this.userService.addUser(body);
    }
}
