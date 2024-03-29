import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { AuthModel } from 'src/app/@models';
import { UserLoginAction } from '../action';

export interface IUserLoginState extends EntityState<AuthModel.IUserInfo> {
  selectedUser?: AuthModel.IUserInfo | null;
  loaded: boolean;
  loading: boolean;
  error?: any;
}

export const adapter: EntityAdapter<AuthModel.IUserInfo> = createEntityAdapter<AuthModel.IUserInfo>({
  selectId: (selectedUser) => selectedUser?.id,
});

const initialState: IUserLoginState = adapter.getInitialState({
  selectedUser: null,
  loaded: false,
  loading: false,
  error: null,
});

const userLoginReducer = createReducer(
  initialState,
  on(UserLoginAction.Login, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null,
    };
  }),
  on(UserLoginAction.LoginFaild, (state, { payload }) => {
    const error = payload;
    return { ...state, loading: false, loaded: false, error };
  }),
  on(UserLoginAction.LoginSuceess, (state, { payload }) =>
    adapter.upsertOne(payload, {
      ...state,
      selectedUser: payload,
      error: null,
    })
  )
);

export function authReducer(state: IUserLoginState | undefined, action: Action) {
  return userLoginReducer(state, action);
}
