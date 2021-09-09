import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(username: string, password: string): Promise<{
        message: string;
        access_token: any;
        access_token_jwt: string;
    }>;
    validateUser(username: string, pass: string): Promise<any>;
    validateToken(token: string): Promise<any>;
}
