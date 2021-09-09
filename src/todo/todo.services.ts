import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./todo.entity";

@Injectable()
export class TodoServices{

    constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>){}

    async findAll(condition){
        return this.todoRepository.find({
            where: condition
        })
    }

    async findOne(condition){
        return this.todoRepository.findOne({
            where: condition
        })
    }

    async create(data: CreateTodoDto, userId: string){
        const todo = new Todo();
        todo.title = data.title;
        todo.desc = data.desc;
        todo.image = data.image;
        todo.status = false;
        todo.userId = userId
        this.todoRepository.save(todo)
        return todo 
    }

    async update(data: CreateTodoDto, id: number, userId: string){
        
        this.todoRepository.save({...data, userId, id: Number(id)})
        
        return {id, ...data}
    }

    delete(id: number){
        return this.todoRepository.delete({id})
    }
}