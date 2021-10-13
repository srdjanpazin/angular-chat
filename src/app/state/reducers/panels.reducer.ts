import { createReducer, on } from "@ngrx/store";
import { toggleChatInfo } from "../actions/panels.actions";

export interface PanelState {
  chatInfo: boolean;
}

export const initialState = {
  chatInfo: true
};

export const panelReducer = createReducer(
  initialState,
  on(toggleChatInfo, state => ({
    chatInfo: !state.chatInfo
  }))
);