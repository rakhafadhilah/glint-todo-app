// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { User } from "./user.entity";

// @Injectable()
// export class AdminServices{
    
//     constructor(@InjectRepository(User) private readonly adminRepository: Repository<User>){}

//     findAllUser(){
//         return this.adminRepository.find()
//     }

//     findOneUser(id: number){
//         return this.adminRepository.findOneOrFail(id)
//     }

//     deleteUser(id: number){
//         return this.adminRepository.delete(id)
//     }
// }