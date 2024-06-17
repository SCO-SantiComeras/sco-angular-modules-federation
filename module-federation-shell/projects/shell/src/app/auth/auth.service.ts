import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { LoginResponse } from './model/login-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/users/login`, user);
  }

  logout(user: User): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/users/logout`, user);
  }
}
