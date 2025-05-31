import { AppDispatch } from '../store';
import { AppState } from '../state';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { userLoginAsyncAction, userLogoutAsyncAction } from './actions';

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function authenticateUser(email: string, password: string) {
  return async (dispatch: AppDispatch, _getState: () => AppState) => {
    dispatch(userLoginAsyncAction.request());
    const auth = getAuth();
    try {
      await wait(2000);
      const response = await signInWithEmailAndPassword(auth, email, password);
      const authToken = await response.user.getIdToken();
      console.log('token: ', authToken);
      // getUserProfile
      // if profile is empty, navigate to Profile Form
      // if profile is good, set the token
      dispatch(userLoginAsyncAction.success({ token: authToken }));
    } catch (error) {
      console.log('error: ', error);
      dispatch(userLoginAsyncAction.failure(error as Error));
    }
  };
}

export function logout() {
  return async (dispatch: AppDispatch, _getState: () => AppState) => {
    dispatch(userLogoutAsyncAction.request());
    const auth = getAuth();
    try {
      await wait(2000);

      await signOut(auth);
      console.log('SUCCESS');
      dispatch(userLogoutAsyncAction.success());
    } catch (error) {
      console.log('error: ', error);
      dispatch(userLogoutAsyncAction.failure(error as Error));
    }
  };
}
