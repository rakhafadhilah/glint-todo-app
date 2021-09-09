"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
let UserService = class UserService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async getUsers() {
        return this.UserRepository.find({ select: ['email', 'isAdmin'] });
    }
    async save(user) {
        return this.UserRepository.save(user);
    }
    async findByUsername(username) {
        return this.UserRepository.find({
            where: {
                username
            },
            take: 1
        });
    }
    async findOne(condition) {
        return this.UserRepository.findOne({
            where: condition
        });
    }
    async remove(user) {
        return this.UserRepository.remove(user);
    }
    async postUsers(name, email, password) {
        const user = this.UserRepository.create({
            name,
            email,
            password,
            token: null,
            isActive: false,
            isAdmin: false
        });
        await this.UserRepository.save(user);
        return user;
    }
    async registerUser(name, username, email, password, confirmPassword) {
        if (password != confirmPassword)
            throw new common_1.HttpException('Password or confirmation password not same', common_1.HttpStatus.FORBIDDEN);
        const isUsernameExist = await this.findByUsername(username);
        const isEmailExist = await this.findOne({ email });
        if (isUsernameExist)
            throw new common_1.HttpException('Username is Already Exist!', common_1.HttpStatus.FORBIDDEN);
        if (isEmailExist)
            throw new common_1.HttpException('Email is Already Exist!', common_1.HttpStatus.FORBIDDEN);
        console.log(isUsernameExist);
        console.log(isEmailExist);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.UserRepository.create({
            name,
            email,
            username,
            password: hashedPassword,
            token: null,
            isActive: false,
            isAdmin: false
        });
        await this.UserRepository.save(user);
        return {
            message: "Register User Success",
            data: user
        };
    }
    async logout(token) {
        const user = await this.UserRepository.findOne({ token });
        if (!user)
            throw new common_1.UnauthorizedException();
        user.token = null;
        this.save(user);
        return {
            message: "Logout Sucess"
        };
    }
    async forgotPassword(email) {
        const user = await this.findOne({ email });
        if (!user)
            throw new common_1.HttpException('Email Has Not Been Registered!', common_1.HttpStatus.UNAUTHORIZED);
        if (!user.token) {
            const token = crypto.randomBytes(10).toString('hex');
            user.token = token;
            this.save(user);
        }
        return {
            message: `Please Visit This Link To Change Your Password 
            http://localhost:3000/forgot-password/${user.token}}`
        };
    }
    async changePassword(token, password, confirmPassword) {
        const user = await this.findOne({ token });
        if (password != confirmPassword)
            throw new common_1.HttpException('Invalid Password and Confimation Password!', common_1.HttpStatus.FORBIDDEN);
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        const new_token = crypto.randomBytes(10).toString('hex');
        user.token = new_token;
        await this.UserRepository.save(user);
        return {
            message: "Change Password Success!",
            access_token: new_token
        };
    }
    async deleteUser(id) {
        const user = await this.findOne({ id });
        this.remove(user);
        return {
            message: "Delete User Success"
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map