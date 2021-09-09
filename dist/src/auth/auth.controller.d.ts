import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginUser(username: string, password: string): Promise<{
        message: string;
        access_token: any;
        access_token_jwt: string;
    }>;
    loginUserReq(req: any): any;
}
