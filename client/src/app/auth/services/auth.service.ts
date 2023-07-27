import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { AuthModel } from 'src/app/@models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<AuthModel.IUserInfo | null>(null);
  public user: AuthModel.IUserInfo;
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private router: Router) { }

  

  login(values: any): Observable<AuthModel.IUserInfo> {
    return this.http.post<AuthModel.IUserInfo>(this.baseUrl + 'account/login', values).pipe(
      map((user: AuthModel.IUserInfo) => {
        if (user) {
          this.setCurrentUser(user);
          this.router.navigate(['/home']);
          return user;
        }
      })
    );
  }

  setCurrentUser(user: AuthModel.IUserInfo) {
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
