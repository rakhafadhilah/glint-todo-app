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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(username, password) {
        const user = await this.userService.findOne({ username });
        if (!user)
            throw new common_1.BadRequestException;
        if (!await bcrypt.compare(password, user.password)) {
            throw new common_1.BadRequestException('invalid credentials');
        }
        const jwt = await this.jwtService.signAsync({ id: user.id, username: user.username });
        user.token = jwt;
        const token = crypto.randomBytes(10).toString('hex');
        user.token = token;
        await this.userService.save(user);
        return {
            message: "Login Success",
            access_token: token,
            access_token_jwt: jwt
        };
    }
    async validateUser(username, pass) {
        const user = await this.userService.findOne({ username });
        if (!user)
            throw new common_1.BadRequestException;
        if (!await bcrypt.compare(pass, user.password)) {
            throw new common_1.UnauthorizedException();
        }
        const { password } = user, result = __rest(user, ["password"]);
        console.log("Validate User Auth Service");
        return result;
    }
    async validateToken(token) {
        const user = await this.userService.findOne({ token });
        if (!user)
            throw new common_1.UnauthorizedException();
        delete user.password;
        console.log('User Auth Service');
        console.log(user);
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map