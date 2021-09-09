/// <reference types="passport" />
import { UserService } from "./user.service";
import { Request } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    showUser(req: Request): Express.User;
    testPayload(req: Request, payload: Record<string, any>): {
        user: Express.User;
        payloaduser: Record<string, any>;
    };
    registerUser(name: string, username: string, email: string, password: string, confirmPassword: string): Promise<any>;
    logoutUser(token: string): Promise<any>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    changePassword(token: string, password: string, confirmPassword: string): Promise<{
        message: string;
        access_token: any;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
