import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../store/task';
import { environment } from '../../../environments/environment';
import { User } from '../../store/user';

interface LoginResponse {
  user: User;
}

@Injectable({ providedIn: 'root' })
export class UserApi {
  http = inject(HttpClient);

  changeUser(name: string, email: string): Observable<LoginResponse> {
    return this.http.put<LoginResponse>(`${environment.apiUrl}/user`, {
      name,
      email,
    });
  }

  getTasks(): Observable<[Task]> {
    return this.http.get<[Task]>(`${environment.apiUrl}/task`);
  }
}
