import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';
import { TodoServices } from './todo.services';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), forwardRef(() => UserModule),],
  controllers: [TodoController],
  providers: [TodoServices],
  exports: [TodoServices]
})

export class ToDoModule {}