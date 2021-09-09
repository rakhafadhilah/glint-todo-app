import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import  { User }  from "./user.entity";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

const bcrypt = require('bcrypt')
const crypto = require('crypto');

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(User) private UserRepository: Repository<User>) {}

    async getUsers(): Promise<User[]>{
        return this.UserRepository.find({select: ['email', 'isAdmin']});
    }

    async save(user: User) {
        return this.UserRepository.save(user)
    }

    async findByUsername(username:string): Promise<User[]> {
        return this.UserRepository.find({
            where: {
                username
            },
            take: 1
        })
    }

    async findOne(condition: any): Promise<User>{
        return this.UserRepository.findOne({
            where: condition

        })
    }

    async remove(user: User){
        return this.UserRepository.remove(user);
    }

    async postUsers(name:string , email: string, password:string): Promise<User>{
        const user: User = this.UserRepository.create({
            name, 
            email, 
            password,
            token: null,
            isActive: false,
            isAdmin: false
        });

        await this.UserRepository.save(user)

        return user
    }


    async registerUser(name:string, username:string, email: string, password:string, confirmPassword: string): Promise<{message: string, data: User} | any>{

            if(password != confirmPassword) throw new HttpException('Password or confirmation password not same', HttpStatus.FORBIDDEN)
            
            const isUsernameExist = await this.findByUsername(username)

            const isEmailExist = await this.findOne({email})
    
            if(isUsernameExist) throw new HttpException('Username is Already Exist!', HttpStatus.FORBIDDEN)

            if(isEmailExist) throw new HttpException('Email is Already Exist!', HttpStatus.FORBIDDEN)

            console.log(isUsernameExist)
            console.log(isEmailExist)
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user: User = this.UserRepository.create({
                name, 
                email, 
                username,
                password: hashedPassword,
                token: null,
                isActive: false,
                isAdmin: false
            })
                
            
            await this.UserRepository.save(user)
    
            return {
                message: "Register User Success",
                data: user
            }

            
    }
    

    async logout(token: string): Promise<any> {
        const user = await this.UserRepository.findOne({token})

        if(!user) throw new UnauthorizedException()
        
        user.token = null

        this.save(user)
        
        return {
            message: "Logout Sucess"
        }
    }

    async forgotPassword(email: string){
        const user = await this.findOne({email})

        if(!user) throw new HttpException('Email Has Not Been Registered!', HttpStatus.UNAUTHORIZED)

        if(!user.token){
            const token = crypto.randomBytes(10).toString('hex');

            user.token = token

            this.save(user)
        }


        return {
            message: `Please Visit This Link To Change Your Password 
            http://localhost:3000/forgot-password/${user.token}}`
        }
    }

    async changePassword(token: string, password: string, confirmPassword: string){
        const user: User = await this.findOne({token})

        if(password != confirmPassword) throw new HttpException('Invalid Password and Confimation Password!', HttpStatus.FORBIDDEN)

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword
            
        const new_token = crypto.randomBytes(10).toString('hex');

        user.token = new_token

        await this.UserRepository.save(user)

        return { 
            message: "Change Password Success!",
            access_token: new_token
        }
    }


    async deleteUser(id: string){
        const user = await this.findOne({id})

        this.remove(user)

        return {
            message: "Delete User Success"
        }
    }

}