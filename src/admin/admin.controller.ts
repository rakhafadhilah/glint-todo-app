// import { Controller, Delete, Get, Param } from "@nestjs/common";
// import { AdminServices } from "./admin.services";

// @Controller('admins')
// export class AdminController{
    
//     constructor(private readonly adminServices: AdminServices){}
    
//     @Get()
//     async findAll(){
//         return {
//             data: await this.adminServices.findAllUser()
//         }
//     }

//     @Get(':id')
//     async findOne(@Param('id') id: number){
//         return{
//             data: await this.adminServices.findOneUser(id)
//         }
//     }

//     @Delete(':id')
//     async remove(@Param('id') id: number){
//         await this.adminServices.deleteUser(id)
//     }
// }