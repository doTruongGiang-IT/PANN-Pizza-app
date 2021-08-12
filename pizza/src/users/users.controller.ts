/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService) {};

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id);
    };

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        return this.userService.getUserAuth(email, password);
    };

    @Post('register')
    register(@Body('username') username: string, @Body('email') email: string, @Body('password') password: string, @Body('profile') profile: string) {
        return this.userService.createUser(username, email, password, profile);
    };

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body('username') username: string, @Body('email') email: string, @Body('password') password: string, @Body('profile') profile: string) {
        return this.userService.updateUser(id, username, email, password, profile);
    };

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    };
}
