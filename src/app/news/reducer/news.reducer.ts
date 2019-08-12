import { Action } from "@ngrx/store";

import { News } from "../model/news.model";
import * as fromRoot from "../../reducers";
import * as NewsActions from "./news.actions";

export interface NewsState {
  newsList: News[];
}

export interface State extends fromRoot.State {
  newsList: NewsState;
}

const initialState = {
  newsList: []
};

export function newsReducer(
  state = initialState,
  action: NewsActions.NewsActions
) {
  switch (action.type) {
    case NewsActions.SET_NEWS_LIST: {
      return {
        ...state,
        newsList: [...action.payload]
      };
    }
    case NewsActions.LOAD_MORE_NEWS: {
      return {
        ...state,
        newsList: [...state.newsList, ...action.payload]
      };
    }
    default:
      return state;
  }
}
