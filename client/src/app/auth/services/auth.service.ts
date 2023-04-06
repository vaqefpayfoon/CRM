import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { AuthModel } from 'src/app/models/auth-model';
import { IUser } from 'src/app/models/auth-model/user.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  public user: IUser;
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private router: Router) { }

  

  login(values: any): Observable<AuthModel.IUser> {
    return this.http.post<AuthModel.IUser>(this.baseUrl + 'account/login', values).pipe(
      map((user: AuthModel.IUser) => {
        if (user) {
          this.setCurrentUser(user);
          this.router.navigate(['/home']);
          return user;
        }
      })
    );
  }

  setCurrentUser(user: IUser) {
    // user.roles = [];
    // const roles = this.getDecodedToken(user.token).role;
    // Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
