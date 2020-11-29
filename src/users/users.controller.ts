import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
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
    @Post('/adduser')
    async addUser(
        @Body() body: UsersService
    ) {
        return this.userService.addUser(body);
    }

    @Patch('/:id/update')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        // console.log(body)
        return this.userService.updateUser(id, body)
    }

    @Delete('/:id/delete')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
}
