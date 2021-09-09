import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseFilters, UseGuards } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { EntityNotFoundExceptionFilter } from "./entity-not-found-exception.filter";
import { TodoServices } from "./todo.services";
import {Request} from 'express';
import { UserGuard } from "src/auth/guard/User.guard";
import { User } from "src/user/user.entity";

 type RequestWithUser = {user: User} & Request;

@UseGuards(UserGuard)
@Controller('todos')
@UseFilters(new EntityNotFoundExceptionFilter)
export class TodoController{
    
    constructor(private readonly todoServices: TodoServices){}

    @Get()
    async findAll(@Req() req:RequestWithUser){
        return {
            data: await this.todoServices.findAll({userId: req.user.id}),
        }
    }

    @Get(':id')
    async findOneId(@Param('id') id:number, @Req() req:RequestWithUser){
        return{
            data: await this.todoServices.findOne({id})
        }
    }

    @Post()
    async create(@Body() data: CreateTodoDto, @Req() req:RequestWithUser){
        return {
            data: await this.todoServices.create(data, req.user.id),
            messege: "success"
        }
    }

    @Put(':id/updateContent')
    async updateContent(@Body() data: CreateTodoDto, @Param('id') id: number, @Req() req:RequestWithUser){
        if(!data.desc){
            data.desc = "";
        }
        return{
            data: await this.todoServices.update(data, id, req.user.id),
            message: "success"
        }
    }

    @Put(':id/updateStatus')
    async updateStatus(@Param('id') id: number, @Req() req:RequestWithUser){
        const dataIsDone = await this.todoServices.findOne(id);
        dataIsDone.status = !dataIsDone.status;
        return{
            data: await this.todoServices.update(dataIsDone, id, req.user.id)
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: number, @Req() req:RequestWithUser){
        await this.todoServices.delete(id);
    }
}