import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../auth/store/auth.models';
import { environment } from '../../environment';

interface LoginResponse {
  user: User;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApi {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, {
      email,
      password,
    });
  }

  registration(
    email: string,
    password: string,
    name: string
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
