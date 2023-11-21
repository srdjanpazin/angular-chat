import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectChat = createSelector(
  (state: AppState) => state.chats,
  state => state.loadedChats[state.currentChatId]
);

export const selectCurrentChatId = createSelector(
  (state: AppState) => state.chats,
  state => state.currentChatId
);