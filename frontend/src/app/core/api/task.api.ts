import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../store/task';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class TaskApi {
  http = inject(HttpClient);

  getTasks(): Observable<[Task]> {
    return this.http.get<[Task]>(`${environment.apiUrl}/task`);
  }

  createTask(task: Task): Observable<Task[]> {
    return this.http.post<Task[]>(`${environment.apiUrl}/task`, task);
  }

  deleteTask(id: string): Observable<Task[]> {
    return this.http.delete<Task[]>(`${environment.apiUrl}/task/${id}`);
  }

  updateTask(task: Task, id: string): Observable<Task[]> {
    return this.http.put<Task[]>(`${environment.apiUrl}/task/${id}`, task);
  }
}
