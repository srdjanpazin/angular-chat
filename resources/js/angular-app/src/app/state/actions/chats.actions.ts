import { createAction, props } from '@ngrx/store';

export const changeChat = createAction(
  '[Contact Component] Change Chat',
  props<{ chatId: string }>()
);

export const addChat = createAction(
  '[Contact Component] Add Chat',
  props<{ chatId: string, contactName: string, contactImage: string }>()
);