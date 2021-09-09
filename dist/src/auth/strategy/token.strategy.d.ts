import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const TokenStrategy_base: new (...args: any[]) => Strategy;
export declare class TokenStrategy extends TokenStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validateToken(Token: string): Promise<any>;
}
export {};
