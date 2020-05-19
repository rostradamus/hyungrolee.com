import { combineReducers } from "redux";
import { AUTH_ACTION_TYPES } from "Actions/actionTypes";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import commentReducer from "./commentReducer";
import DiaryReducer from "./DiaryReducer";
import NoteReducer from "./NoteReducer";

const appReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  modal: modalReducer,
  comments: commentReducer,
  diaries: DiaryReducer,
  note: NoteReducer
});

export default (state, action) => {
  if (action.type === AUTH_ACTION_TYPES.LOGOUT_SUCCESS
    || action.type === AUTH_ACTION_TYPES.SESSION_EXPIRED) {
    state = { auth: undefined };
  }

  return appReducer(state, action);
};
