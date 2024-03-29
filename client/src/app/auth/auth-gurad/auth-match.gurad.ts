import { Injectable } from '@angular/core';
import {
  Router,
  CanMatch,
  Route,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthMatchGuard implements CanMatch {
  constructor(private authService: AuthService) {}

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        else {
          route.redirectTo = '/auth/login';
          return false;
        }
      }),
      // catchError(this.router.navigate['/auth/login'])
    );
  }
}
