import { createAction, props, union } from "@ngrx/store";
import { CommonModel, UserModel } from "src/app/@models";
import { IPagination } from "src/app/@models/common/pagination.interface";

export const loadUsers = createAction(
    '[Base Info list] Get Users'
  );
  
  export const loadUsersSuccess = createAction(
    '[Base Info list] Get Users success',
    props<{ users: CommonModel.PaginatedResult<UserModel.IUser[]> }>()
  );
  
  export const loadUsersFailed = createAction(
    '[Base Info list] Get Users failed',
    props<{ payload: any }>()
  );

  export const loadUser = createAction(
    '[Base Info list] Get User',
    props<{ payload: string }>()
  )

  export const loadUserSuccess = createAction(
    '[Base Info list] Get User Success',
    props<{ payload: UserModel.IUser }>()
  )

  export const loadUserFail = createAction(
    '[Base Info list] Get User Fail',
    props<{ payload: any}>()
  )

  export const SetUsersPage = createAction(
    '[Hub] Set Users Page',
    props<{ payload: IPagination }>()
  );

  export const ChangeUsersPage = createAction(
    '[Hub] Change Users Page',
    props<{ payload: IPagination }>()
  );

  const allActions = union({
    loadUsers,
    loadUsersSuccess,
    loadUsersFailed,
    SetUsersPage,
    ChangeUsersPage,
    loadUser,
    loadUserSuccess,
    loadUserFail
  });

  export type UsersActions = typeof allActions;