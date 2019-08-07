import { Action } from "@ngrx/store";
import * as UIActions from "./ui.actions";

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(state = initialState, action: Action) {
  switch (action.type) {
    case UIActions.UI_START_LOADING:
      return {
        isLoading: true
      };
    case UIActions.UI_STOP_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
