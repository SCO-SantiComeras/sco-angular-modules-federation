import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../common/module';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(private readonly http: HttpClient) { }

  listModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${environment.apiUrl}/modules/list-modules`);
  }

  getModule(moduleName: string): Observable<Module> {
    return this.http.get<Module>(`${environment.apiUrl}/modules/get-module/${moduleName}`);
  }
}
