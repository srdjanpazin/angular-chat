import { ChatState } from "./reducers/chats.reducer";
import { PanelState } from "./reducers/panels.reducer";
import { PopupState } from "./reducers/popups.reducer";
import { UserState } from "./reducers/user.reducer";

export interface AppState {
  user: UserState,
  chats: ChatState,
  popups: PopupState,
  panels: PanelState
}