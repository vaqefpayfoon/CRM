import { Injectable } from '@angular/core';
import { UserAction } from '../action';
import { UserService } from '../../service/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserModel, CommonModel } from 'src/app/@models';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions<UserAction.UsersActions>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.loadUsers.type),
      switchMap(() => {
        return this.userService.getUsers().pipe(
          map((users: CommonModel.PaginatedResult<UserModel.IUser[]>) =>
            UserAction.loadUsersSuccess({
              users: users,
            })
          ),
          catchError((res: any) => {
            return of(UserAction.loadUsersFailed({ payload: res }));
          })
        );
      })
    );
  });

  changeUserPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.ChangeUsersPage.type),
      map(() => UserAction.loadUsers())
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.loadUser.type),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.userService.getUser(payload).pipe(
          map((data: UserModel.IUser) =>
            UserAction.loadUserSuccess({
              payload: data,
            })
          ),
          catchError((res: any) => {
            return of(
              UserAction.loadUserFail({
                payload: {
                  status: res.status,
                  res,
                },
              })
            );
          })
        );
      })
    )
  );

  handleGetUserFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.loadUserFail.type),
      map((action) => {
        const { message } = action.payload;
        this.toggleSnackbar(message);
        return action.payload;
      })
    )
  );

  handleGetUsersFail$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserAction.loadUsersFailed.type),
    map((action) => {
      const { message } = action.payload;
      this.toggleSnackbar(message);
      return action.payload;
    })
  )
);

  toggleSnackbar(message: string) {
    return this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['snackbar--custom'],
    });
  }
}
