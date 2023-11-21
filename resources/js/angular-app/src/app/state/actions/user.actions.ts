import { createAction, props } from "@ngrx/store";

export const logInUser = createAction(
  '[Login Component] Log In User',
  props<{ userId: string, userFirstName: string, userImage: string }>()
);

export const logOutUser = createAction(
  '[Header Component] Log Out User'
);