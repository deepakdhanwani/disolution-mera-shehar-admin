import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromUI from '../shared/ui.reducer';
import * as fromAuth from '../auth/reducers/auth.reducer';

export interface State {
  ui: fromUI.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};


// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getUiState = createFeatureSelector<fromUI.State>("ui");
export const getLoadingStatus = createSelector(
  getUiState,
  fromUI.getIsLoading
);

export const getAuthState = createFeatureSelector<fromAuth.State>("auth");
export const getAuthenticationStatus = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticated
);

export const getCurrentUserStatus = createSelector(
  getAuthState,
  fromAuth.getCurrentUser
);

export const getCurrentUser = createSelector(
  getAuthState,
  fromAuth.getCurrentUser
);
