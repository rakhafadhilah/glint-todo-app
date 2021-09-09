import { BadRequestException, Body, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

const bcrypt = require('bcrypt')
const crypto = require('crypto');

@Injectable()
export class AuthService {
    // constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    constructor( 
        @Inject(forwardRef(() => UserService))
         private userService: UserService, 
         private jwtService: JwtService
         ){}

    async login(username: string, password: string){
        const user = await this.userService.findOne({username})

        if(!user) throw new BadRequestException

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user.id, username: user.username});

        user.token = jwt

        const token = crypto.randomBytes(10).toString('hex');

        user.token = token

        await this.userService.save(user)

        return {
            message: "Login Success",
            access_token: token,
            access_token_jwt: jwt
        }
    }

    async loginAdmin(username: string, password: string){
        const user = await this.userService.findOne({username})

        if(!user) throw new BadRequestException

        if(!user.isAdmin) throw new UnauthorizedException();

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }

        // const jwt = await this.jwtService.signAsync({id: user.id, username: user.username});
        // user.token = jwt

        const token = crypto.randomBytes(10).toString('hex');

        user.token = token

        await this.userService.save(user)

        return {
            message: "Login Admin Success",
            access_token: token,
        }
    }

    async validateUser(username: string, pass: string): Promise<any>{
        const user = await this.userService.findOne({username})

        if(!user) throw new BadRequestException

        if (!await bcrypt.compare(pass, user.password)) {
            // throw new BadRequestException('invalid credentials');
            throw new UnauthorizedException();
        }

        const { password, ...result } = user;

        // delete user.password

        // console.log(result)
        console.log("Validate User Auth Service")

        return result

    }

    async validateToken(token: string): Promise<any>{
        const user = await this.userService.findOne({token})

        if(!user) throw new UnauthorizedException();
        delete user.password

        console.log('User Auth Service')
        console.log(user)
        return user

    }
}
