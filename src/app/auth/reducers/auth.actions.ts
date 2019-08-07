import { Action } from "@ngrx/store";
import { User } from "../model/user.model";

export const SET_CURRENT_USER = "[Auth] Set Current User";
export const REMOVE_CURRENT_USER = "[Auth] Remove Current User";
export const SET_AUTHENTICATED = "[Auth] Set Authenticated";
export const SET_UNAUTHENTICATED = "[Auth] Set Unauthenticated";

export class SetAuthenticaated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class SetCurrentUser implements Action {
  readonly type = SET_CURRENT_USER;

  constructor(public payload: User) {}
}

export class RemoveCurrentUser implements Action {
  readonly type = REMOVE_CURRENT_USER;
}

export type AuthActions =
  | SetCurrentUser
  | RemoveCurrentUser
  | SetAuthenticaated
  | SetUnauthenticated;
