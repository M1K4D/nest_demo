import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service'
import { promises } from 'fs';
import { from } from 'rxjs';
import { userDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }
    @Get('getuser')
    async getuser() {
        return this.userService.getUser();
    }

    @Post('/adduser')
    @UsePipes(new ValidationPipe())
    async addUser(
        @Body() body: userDto
    ) {
        return this.userService.addUser(body);
    }

    // @Patch('/:id/update')
    // @UsePipes(new ValidationPipe())
    // async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: userDto) {
    //     // console.log(body)
    //     return this.userService.updateUser(id, body)
    // }

    // @Delete('/:id/delete')
    // async deleteUser(@Param('id', ParseIntPipe) id: number) {
    //     return this.userService.delete(id)
    // }
}
