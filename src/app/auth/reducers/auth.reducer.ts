import { Action } from "@ngrx/store";

import * as AuthActions from "./auth.actions";
import { User } from "../model/user.model";

export interface State {
  isAuthenticated: boolean;
  currentUser: User;
}

const initialState: State = {
  isAuthenticated: false,
  currentUser: null
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case AuthActions.REMOVE_CURRENT_USER:
      return {
        ...state,
        currentUser: null
      };
    case AuthActions.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };
    case AuthActions.SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getCurrentUser = (state: State) => state.currentUser;
