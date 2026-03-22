import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../store/user';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  user: User;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApi {
  http = inject(HttpClient);

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, {
      email,
      password,
    });
  }

  registration(
    email: string,
    password: string,
    name: string,
  ): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/user`, {
      email,
      password,
      name,
    });
  }

  me(token: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/me`, {
      token,
    });
  }
}
