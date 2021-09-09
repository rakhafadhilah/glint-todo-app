import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";

@Injectable()
export class AdminGuard implements CanActivate{
  
  // constructor(private reflector: Reflector, userService: UserService) {}
  constructor(private userService: UserService) {}

  // async canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean>  {
  async canActivate(context: ExecutionContext,) {

    const request = context.switchToHttp().getRequest();
    // const user = request.user;

    const auth = request.headers.authorization

    const token = auth.substring(7, auth.length)

    const user = await this.userService.findOne({ token })


    return user && user.isAdmin;
  }

}