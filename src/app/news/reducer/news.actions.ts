import { Action } from "@ngrx/store";
import { News } from "../model/news.model";

export const SET_NEWS_LIST = "[News] Set News List";
export const LOAD_MORE_NEWS = "[News] Load more news";
//export const NEW_NEWS_ADDED = "[]"

export class SetNewsList implements Action {
  readonly type = SET_NEWS_LIST;

  constructor(public payload: News[]) {}
}

export class LoadMoreNews implements Action {
    readonly type = LOAD_MORE_NEWS;

    constructor(public payload: News[]) {}
}

export type NewsActions = SetNewsList | LoadMoreNews;
