import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectUserId = createSelector(
  (state: AppState) => state.user,
  state => state.userId
);