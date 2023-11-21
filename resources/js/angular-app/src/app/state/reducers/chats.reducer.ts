import { createReducer, on } from '@ngrx/store';
import { addChat, changeChat } from '../actions/chats.actions';

export interface ChatData {
  chatId: string;
  contactName: string;
  contactImage: string;
}

export interface ChatState {
  currentChatId: string;
  loadedChats: { [index: string]: ChatData };
}

export const initialState: ChatState = {
  currentChatId: '',
  loadedChats: {}
};

export const chatReducer = createReducer(
  initialState,
  on(changeChat, (state, payload) => {
    let obj = {
      currentChatId: payload.chatId,
      loadedChats: {}
    };

    for (let key of Object.keys(state.loadedChats)) {
      obj.loadedChats[key] = { ...state.loadedChats[key] };
    }
    return obj;
  }),

  on(addChat, (state, payload) => {
    let obj = {
      currentChatId: payload.chatId,
      loadedChats: {}
    };

    for (let key of Object.keys(state.loadedChats)) {
      obj.loadedChats[key] = { ...state.loadedChats[key] };
    }

    obj.loadedChats[payload.chatId] = {
      chatId: payload.chatId,
      contactName: payload.contactName,
      contactImage: payload.contactImage
    };
    return obj;
  })
);