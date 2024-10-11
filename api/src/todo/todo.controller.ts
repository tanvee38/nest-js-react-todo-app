import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.todoService.remove(id);
  }
}
