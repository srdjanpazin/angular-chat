import { createReducer, on } from '@ngrx/store';
import { logInUser, logOutUser } from '../actions/user.actions';

export interface UserState {
  userId: string;
  userFirstName: string;
  userImage: string;
}

export const initialState = {
  userId: '',
  userFirstName: '',
  userImage: ''
};

export const userReducer = createReducer(
  initialState,
  on(logInUser, (state, payload) => ({
    userId: payload.userId,
    userFirstName: payload.userFirstName,
    userImage: payload.userImage
  })),

  on(logOutUser, state => initialState)
);