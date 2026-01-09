import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../store/auth/auth.models';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class TaskApi {
  http = inject(HttpClient);

  getTasks(): Observable<[Task]> {
    return this.http.get<[Task]>(`${environment.apiUrl}/task`);
  }
}
