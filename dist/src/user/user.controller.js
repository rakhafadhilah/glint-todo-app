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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const User_guard_1 = require("../auth/guard/User.guard");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const local_auth_guard_1 = require("../auth/guard/local-auth.guard");
const admin_guard_1 = require("../auth/guard/admin.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    showUser(req) {
        return req.user;
        return this.userService.getUsers();
    }
    testPayload(req, payload) {
        return { user: req.user, payloaduser: payload };
    }
    registerUser(name, username, email, password, confirmPassword) {
        return this.userService.registerUser(name, username, email, password, confirmPassword);
    }
    logoutUser(token) {
        return this.userService.logout(token);
    }
    forgotPassword(email) {
        return this.userService.forgotPassword(email);
    }
    changePassword(token, password, confirmPassword) {
        return this.userService.changePassword(token, password, confirmPassword);
    }
    deleteUser(id) {
        return this.userService.deleteUser(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(User_guard_1.UserGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "showUser", null);
__decorate([
    (0, common_1.UseGuards)(User_guard_1.UserGuard),
    (0, common_1.Post)('testPayload'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "testPayload", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('username')),
    __param(2, (0, common_1.Body)('email')),
    __param(3, (0, common_1.Body)('password')),
    __param(4, (0, common_1.Body)('confirmPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Put)('/logout'),
    __param(0, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logoutUser", null);
__decorate([
    (0, common_1.Post)('/forgot-password'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/reset-password/:token'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Body)('confirmPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map