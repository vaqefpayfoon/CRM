import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducer';
import * as fromUserReducer from '../reducer/user.reducer';
import { IPagination } from 'src/app/@models/common/pagination.interface';

export const getUsersState = createSelector(
  fromFeature.getBaseInfoModuleState,
  (state: fromFeature.IBaseInfoState) => state.users
);

export const getUsersConfig = createSelector(
  getUsersState,
  (state: fromUserReducer.IUserState) => state.pagination
);

export const getUsersLoading = createSelector(
  getUsersState,
  (state: fromUserReducer.IUserState) => state.loading
);

export const getUsersLoaded = createSelector(
  getUsersState,
  (state: fromUserReducer.IUserState) => state.loaded
);

export const getUsersError = createSelector(
  getUsersState,
  (state: fromUserReducer.IUserState) => state.error
);

export const getAllUsers = createSelector(
  getUsersState,
  fromUserReducer.selectAllUsers
);

export const getAllUsersEntites = createSelector(
  getUsersState,
  fromUserReducer.selectUsersEntities
);

export const getAllUsersTotal = createSelector(
  getUsersState,
  fromUserReducer.selectUsersTotal
);

export const getAllUsersUuid = createSelector(
  getUsersState,
  fromUserReducer.selectUsersUuids
);

export const getUsersPage = createSelector(
  getUsersConfig,
  (pagination): IPagination => {
    return pagination
      ? {
          totalPages: pagination.totalPages,
          currentPage: pagination.currentPage,
          itemsPerPage: pagination.itemsPerPage,
          totalItems: pagination.totalItems,
        }
      : { itemsPerPage: 10, currentPage: 1 };
  }
);

export const getSelectedUser = createSelector(
  getUsersState,
  (state: fromUserReducer.IUserState) => state.selectedUser
);

export const getUserTotals = createSelector(
  getUsersState,
  fromUserReducer.selectUsersTotal
);

export const userQuery = {
  getUsersConfig,
  getUsersLoading,
  getUsersLoaded,
  getUsersError,
  getAllUsers,
  getAllUsersEntites,
  getAllUsersUuid,
  getUsersPage,
  getSelectedUser,
  getUserTotals
};
