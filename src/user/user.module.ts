import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { AuthModule } from "src/auth/auth.module";
import { UserGuard } from "src/auth/guard/User.guard";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserGuard],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}