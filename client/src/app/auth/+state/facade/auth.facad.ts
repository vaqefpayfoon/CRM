import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthModel } from 'src/app/@models';
import { UserLoginAction } from "../action";
import { IUserLoginMapState } from "../reducer";

@Injectable()
export class AuthFacade {
    constructor(
        private store: Store<IUserLoginMapState>,
      ) {}
      login(payload: AuthModel.ILogin) {
        this.store.dispatch(UserLoginAction.Login({payload}));
      }
}