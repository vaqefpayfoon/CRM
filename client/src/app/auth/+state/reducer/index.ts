import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export interface IUserLoginMapState {
    readonly auth: fromAuth.IUserLoginState;
  }
  
  export const REDUCERS: ActionReducerMap<IUserLoginMapState> = {
    auth: fromAuth.authReducer,
  };
  
  export const getAuthModuleState = createFeatureSelector<IUserLoginMapState>('auth');