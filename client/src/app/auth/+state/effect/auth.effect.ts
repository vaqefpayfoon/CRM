import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserLoginAction } from '../action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthModel } from 'src/app/@models';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {
  constructor(
    private authService: AuthService,
    private actions$: Actions<UserLoginAction.UserLoginActionUnion>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserLoginAction.Login.type),
      map((action) => action.payload),
      switchMap((payload: AuthModel.ILogin) => {
        return this.authService.login(payload).pipe(
          map((user: AuthModel.IUserInfo) => {
            return UserLoginAction.LoginSuceess({
              payload: user,
            });
          }),
          catchError((res: any) => {
            return of(
              UserLoginAction.LoginFaild({ payload: res })
            );
          })
        );
      })
    )
  );
  userLoginFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserLoginAction.LoginFaild.type),
        map((action) => {
          return this.toggleSnackbar(`${action.payload.message}`);
        })
      ),
    { dispatch: false }
  );
  userLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserLoginAction.LoginSuceess.type),
        map((action) => {
          this.router.navigate(['']);
          return this.toggleSnackbar('welcome');
        })
      ),
    { dispatch: false }
  );
  toggleSnackbar(message: string) {
    return this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['snackbar--custom'],
    });
  }
}
