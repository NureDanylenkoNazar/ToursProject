import { ActionType } from 'typesafe-actions';
import * as SessionActions from './session/actions';

const actions = {
  SessionActions,
};

export type ActionTypes = ActionType<typeof actions>;
