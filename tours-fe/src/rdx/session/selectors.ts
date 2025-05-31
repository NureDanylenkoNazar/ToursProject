import { RequestState } from '../../types/networkTypes';
import { AppState } from '../state';

export const selectIsAuthLoading = (state: AppState) => {
  return state.session.authRequest === RequestState.Loading;
};

export const selectIsUserAuthorised = (state: AppState) => {
  return Boolean(state.session.token);
};
