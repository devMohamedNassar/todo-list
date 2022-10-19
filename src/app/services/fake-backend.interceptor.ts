import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

const TASKS_KEY = 'TASKS';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  private getLocalStorageData(): Task[] {
    const localStorageData = localStorage.getItem(TASKS_KEY);
    const defaultTasks: Task[] = [{...new Task('Buy new sweatshirt'), done: true}, {...new Task('Go for a walk'), id: `${(new Date()).valueOf()}1`}];
    if(!localStorageData) localStorage.setItem(TASKS_KEY, JSON.stringify(defaultTasks));
    return localStorageData ? JSON.parse(localStorageData).sort((a: Task, b: Task) => (+a.id) - (+b.id)) : defaultTasks;
  }
  private updateLocalStorageData(task: Task){
    const tasks = this.getLocalStorageData().filter(item => item.id !== task.id);
    tasks.push(task);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
  private deleteFromLocalStorage(id: string){
    const tasks = this.getLocalStorageData();
    const index = tasks.findIndex(task => task.id === id);
    if(index < 0) throw new Error(`There is no task with id ${id}`);
    else {
      tasks.splice(index, 1);
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    switch(request.method.toLowerCase()){
      case 'post':
      case 'patch':
        this.updateLocalStorageData(<Task>request.body);
        return of(new HttpResponse());
      case 'get':
        return of(new HttpResponse({body: this.getLocalStorageData()}));
      case 'delete':
        const url = request.url.split('/');
        this.deleteFromLocalStorage(url[url.length - 1]);
        return of(new HttpResponse());
    }
    return next.handle(request);
  }
}
