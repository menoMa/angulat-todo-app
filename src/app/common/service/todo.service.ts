import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TodoItem } from '../../todo/interface/todo-item';

/**
 * todoリストを管理するサービス
 */
@Injectable()
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:3000/api/v1/todo/';
  private list: any;

  todoList() {
    return this.list;
  }

  // TodoリストをDBから取得する
  fetchAll(): Promise<Array<TodoItem>> {
    const url = this.baseUrl;
    return this.http.get(url).toPromise().then((todoList) => {

      this.list = todoList;
      return Promise.resolve(this.list);
    }).catch((error) => {
      throw new Error(error);
    });

  }

  // todoを作成してDBに登録する
  createTodo(todo: TodoItem): Promise<any> {
    const url = this.baseUrl + 'new';

    const body = {
      title: todo.title,
      description: todo.description,
      date: todo.date
    };

    return this.http.post(url, body).toPromise();
  }

  // todo を更新する
  updateTodo(todo: TodoItem): Promise<any> {
    const url = this.baseUrl + 'update/' + todo._id;

    const body = {
      title: todo.title,
      description: todo.description,
      date: todo.date,
      isComplete: todo.isComplete
    };
    return this.http.put(url, body).toPromise();
  }

  // todoを削除する
  deleteTodo(todoId: string): Promise<any> {
    this.list = this.list.filter((todo) => todo._id !== todoId);
    const url = this.baseUrl + 'delete/' + todoId;

    return this.http.delete(url).toPromise();
  }
}