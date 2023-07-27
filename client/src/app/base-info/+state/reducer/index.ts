import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromUsers from './user.reducer';

export interface IBaseInfoState {
    readonly users: fromUsers.IUserState
}

export const REDUCERS: ActionReducerMap<IBaseInfoState> = {
    users: fromUsers.reducer
}

export const getBaseInfoModuleState = createFeatureSelector<IBaseInfoState>('baseInfo');