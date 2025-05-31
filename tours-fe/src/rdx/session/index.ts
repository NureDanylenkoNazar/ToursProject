import * as SessionActions from './actions';
import { RequestState } from '../../types/networkTypes';
import { ActionTypes } from '../actions';
import { getType } from 'typesafe-actions';

export interface SessionState {
  token: string | null;
  authRequest: RequestState;
  logoutRequest: RequestState;
}

const initialSatate: SessionState = {
  token: null,
  authRequest: RequestState.Unset,
  logoutRequest: RequestState.Unset,
};

export const sessionReducer = (state: SessionState = initialSatate, action: ActionTypes) => {
  switch (action.type) {
    case getType(SessionActions.userLoginAsyncAction.request):
      return {
        ...state,
        authRequest: RequestState.Loading,
      };
    case getType(SessionActions.userLoginAsyncAction.success):
      return {
        ...state,
        token: action.payload.token,
        authRequest: RequestState.Success,
      };
    case getType(SessionActions.userLoginAsyncAction.failure):
      return {
        ...state,
        authRequest: RequestState.Failure,
      };
    case getType(SessionActions.userLogoutAsyncAction.request):
      return {
        ...state,
        logoutRequest: RequestState.Loading,
      };
    case getType(SessionActions.userLogoutAsyncAction.success):
      return {
        ...state,
        token: undefined,
        logoutRequest: RequestState.Success,
      };
    case getType(SessionActions.userLogoutAsyncAction.failure):
      return {
        ...state,
        logoutRequest: RequestState.Failure,
      };
    default:
      return state;
  }
};
