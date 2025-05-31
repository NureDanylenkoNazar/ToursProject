import { createAsyncAction } from 'typesafe-actions';

enum SessionActions {
  USER_LOGIN_REQUEST = '@session/USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = '@session/USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILURE = '@session/USER_LOGIN_FAILURE',

  USER_CREATE_REQUEST = '@session/USER_CREATE_REQUEST',
  USER_CREATE_SUCCESS = '@session/USER_CREATE_SUCCESS',
  USER_CREATE_FAILURE = '@session/USER_CREATE_FAILURE',

  USER_LOGOUT_REQUEST = '@session/USER_LOGOUT_REQUEST',
  USER_LOGOUT_SUCCESS = '@session/USER_LOGOUT_SUCCESS',
  USER_LOGOUT_FAILURE = '@session/USER_LOGOUT_FAILURE',
}

export const userLoginAsyncAction = createAsyncAction(
  SessionActions.USER_LOGIN_REQUEST,
  SessionActions.USER_LOGIN_SUCCESS,
  SessionActions.USER_LOGIN_FAILURE
)<undefined, { token: string }, Error>();

export const userLogoutAsyncAction = createAsyncAction(
  SessionActions.USER_LOGOUT_REQUEST,
  SessionActions.USER_LOGOUT_SUCCESS,
  SessionActions.USER_LOGOUT_FAILURE
)<undefined, undefined, Error>();
