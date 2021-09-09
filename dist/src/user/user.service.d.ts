import { Repository } from "typeorm";
import { User } from "./user.entity";
export declare class UserService {
    private UserRepository;
    constructor(UserRepository: Repository<User>);
    getUsers(): Promise<User[]>;
    save(user: User): Promise<User>;
    findByUsername(username: string): Promise<User[]>;
    findOne(condition: any): Promise<User>;
    remove(user: User): Promise<User>;
    postUsers(name: string, email: string, password: string): Promise<User>;
    registerUser(name: string, username: string, email: string, password: string, confirmPassword: string): Promise<{
        message: string;
        data: User;
    } | any>;
    logout(token: string): Promise<any>;
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
