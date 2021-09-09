import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo/todo.controller';
import { Todo } from './todo/todo.entity';
import { TodoServices } from './todo/todo.services';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from '../ormconfig';
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module';
import { ToDoModule } from './todo/todo.module'

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule, AuthModule, ToDoModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
