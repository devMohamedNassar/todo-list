import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Task[]>{
    return this.httpClient.get<Task[]>(environment.url);
  }

  add(task: Task): Observable<any> {
    return this.httpClient.post(environment.url, task);
  }

  update(task: Task): Observable<any> {
    return this.httpClient.patch(`${environment.url}/${task.id}`, task);
  }

  delete(id: string): Observable<any>{
    return this.httpClient.delete(`${environment.url}/${id}`);
  }
}
