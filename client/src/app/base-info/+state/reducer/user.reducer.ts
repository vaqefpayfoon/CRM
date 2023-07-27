import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from 'src/app/@models';
import { IPagination } from 'src/app/@models/common/pagination.interface';
import { UserAction } from '../action';

export interface IUserState extends EntityState<UserModel.IUser> {
  pagination: IPagination;
  selectedUser: UserModel.IUser | null;
  loaded: boolean;
  loading: boolean;
  error?: any;
}

export const adapter: EntityAdapter<UserModel.IUser> =
  createEntityAdapter<UserModel.IUser>({
    selectId: (selectedUser) => selectedUser.id,
  });

const initialState: IUserState = adapter.getInitialState({
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  },
  selectedUser: null,
  loaded: false,
  loading: false,
  error: null,
});

const userReducer = createReducer(
    initialState,
    on(UserAction.loadUsers, (state) => {
        return {
            ...state,
            loading: true,
            loaded: false,
            error: null
        }
    }),
    on(UserAction.loadUsersSuccess, (state, {users}) => {
        return adapter.setAll(users.result, {
            ...state,
            loading: false,
            loaded: true,
            error: null
        })
    }),
    on(UserAction.loadUsersFailed, UserAction.loadUserFail, (state, {payload}) => {
      const error = payload;
      return adapter.removeAll({
        ...initialState,
        error,
      });
    }),

    on(UserAction.SetUsersPage, (state, { payload }) => {
      const { currentPage, itemsPerPage } = payload;
      return adapter.removeAll({
        ...initialState,
        pagination: {
          ...state.pagination,
          currentPage,
          itemsPerPage,
        },
      });
    }),

    on(UserAction.ChangeUsersPage, (state, { payload }) => {
      const { currentPage, itemsPerPage } = payload;
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage,
          itemsPerPage,
        },
      };
    }),

    on(UserAction.loadUser, (state, { payload }) => {
      return {
        ...state,
        error: null,
        uuid: payload,
      };
    }),
    on(UserAction.loadUserSuccess, (state, { payload }) =>
      adapter.upsertOne(payload, {
        ...state,
        selectedUser: payload,
        error: null,
      })
    ),
)

export function reducer(state: IUserState | undefined, action: Action) {
  return userReducer(state, action);
}

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();


  // select the array of users uuids
  export const selectUsersUuids = selectIds;
  
  // select the dictionary of users entities
  export const selectUsersEntities = selectEntities;
  
  // select the array of users
  export const selectAllUsers = selectAll;
  
  // select the total users count
  export const selectUsersTotal = selectTotal;