import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // Docker service name
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todo',
      entities: [Todo],
      synchronize: true, // Set to false in production
    }),
    TodoModule,
  ],
})
export class AppModule {}
