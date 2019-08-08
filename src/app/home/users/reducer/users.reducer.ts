import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../../../auth/model/user.model";

import * as fromRoot from "../../../reducers";
import * as UsersActions from "./users.action";

export interface UsersState {
  userList: User[];
}

export interface State extends fromRoot.State {
  userList: UsersState;
}

const initialState = {
  userList: []
};

export function usersReducer(
  state = initialState,
  action: UsersActions.UsersActions
) {
  switch (action.type) {
    case UsersActions.SET_USER_LIST:
      return {
        state,
        userList: [...action.payload]
      };
    default:
      return state;
  }
}

export const getUsersState = createFeatureSelector<UsersState>('userList');

export const getUsersList = createSelector(getUsersState, (state: UsersState) => state.userList);
