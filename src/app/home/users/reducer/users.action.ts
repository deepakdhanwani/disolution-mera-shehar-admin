import { Action } from "@ngrx/store";
import { User } from "../../../auth/model/user.model";

export const SET_USER_LIST = "[Users] Set user list";

export class SetUserList implements Action {
  readonly type = SET_USER_LIST;

  constructor(public payload: User[]) {}
}

export type UsersActions = SetUserList;
