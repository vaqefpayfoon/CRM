import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserModel, CommonModel } from 'src/app/@models';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<CommonModel.PaginatedResult<UserModel.IUser[]>> {
    return this.http.get<CommonModel.PaginatedResult<UserModel.IUser[]>>(this.baseUrl + "user").pipe(map(res => res));
  }

  getUser(id: string): Observable<UserModel.IUser> {
    return this.http.get<UserModel.IUser>(this.baseUrl + "user/getById").pipe(map(res => res));
  }
}
