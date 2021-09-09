import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserGuard } from "../auth/guard/User.guard"
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "src/auth/guard/local-auth.guard";
import { AdminGuard } from "src/auth/guard/admin.guard";
import {Request} from 'express';

@Controller('api/user')
export class UserController {

    constructor(private userService: UserService) {}

    @UseGuards(UserGuard, AdminGuard)
    @Get()
    showUser(@Req() req: Request) {
        // return req.user;
        return this.userService.getUsers()
    }
    @UseGuards(UserGuard)
    @Post('testPayload')
    testPayload(@Req() req: Request, @Body() payload: Record<string,any>) {
        // return {user: req.user, payloaduser: payload};
        return this.userService.getUsers()
    }

    @Post('register')
    registerUser(
        @Body('name') name: string, 
        @Body('username') username: string, 
        @Body('email') email:string, 
        @Body('password') password:string,
        @Body('confirmPassword') confirmPassword:string) {

        return this.userService.registerUser(name, username, email, password, confirmPassword)
    }


    @Put('/logout')
    logoutUser(
        @Body('token') token:string,
    ){
        return this.userService.logout(token)
    }

    @Post('/forgot-password')
    forgotPassword(@Body('email') email: string){
        return this.userService.forgotPassword(email)
    }

    @Post('/reset-password/:token')
    changePassword(
        @Param('token') token: string, 
        @Body('password') password:string, 
        @Body('confirmPassword') confirmPassword: string){

            return this.userService.changePassword(token, password, confirmPassword);

    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id)
    }
}
