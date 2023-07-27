import { Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUserState } from '../reducer/user.reducer';
import { userQuery } from '../selector';
import { UserService } from '../../service/user.service';
import { UserAction } from '../action';
import { IPagination } from 'src/app/@models/common/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {

  users$ = this.store.select(userQuery.getAllUsers);

  user$ = this.store.select(userQuery.getSelectedUser);

  getUserConfig$ = this.store.select(userQuery.getUsersConfig);

  loading$ = this.store.select(userQuery.getUsersLoading);

  loaded$ = this.store.select(userQuery.getUsersLoaded);

  error$ = this.store.select(userQuery.getUsersError);

  total$ = this.store.select(userQuery.getUserTotals);

  constructor(private store: Store<IUserState>, private injector: Injector) {}

  private _userService: UserService;
  public get userService(): UserService {
    if (!this._userService) {
      this._userService = this.injector.get(UserService);
    }
    return this._userService;
  }

  getUsers() {
    this.store.dispatch(UserAction.loadUsers());
  }

  resetUserPage() {
    const params: IPagination = {
      currentPage: 1,
      itemsPerPage: 10,
    };
    this.store.dispatch(
      UserAction.SetUsersPage({ payload: params })
    );
  }

  changeUserPage(config: IPagination) {
    this.store.dispatch(
        UserAction.ChangeUsersPage({ payload: config })
    );
  }

  getUser(uuid: string) {
    this.store.dispatch(UserAction.loadUser({ payload: uuid }));
  }
}
