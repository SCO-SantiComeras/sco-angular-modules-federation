import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users/list-users`);
  }

  getUser(name: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/get-user/${name}`);
  }
}
