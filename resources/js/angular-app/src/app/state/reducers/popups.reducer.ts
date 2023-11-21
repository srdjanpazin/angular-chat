import { createReducer, on } from '@ngrx/store';
import { toggleChatOptions } from '../actions/popups.actions';

export interface PopupState {
  chatOptions: boolean;
}

export const initialState: PopupState = {
  chatOptions: false
};

export const popupsReducer = createReducer(
  initialState,
  on(toggleChatOptions, state => ({
    ...state,
    chatOptions: !state.chatOptions
  }))
);