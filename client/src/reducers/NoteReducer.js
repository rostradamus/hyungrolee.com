import { NOTE_ACTION_TYPES } from "Actions/actionTypes";

const initialState = {
  isFetching: false,
  isNew: false,
  title: "",
  content: "",
  author: {},
  updated_at: null,
  err: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case NOTE_ACTION_TYPES.FETCH_REQUEST:
  case NOTE_ACTION_TYPES.ADD_REQUEST:
  case NOTE_ACTION_TYPES.EDIT_REQUEST:
    return Object.assign({...state}, {isFetching: true, err: null}, action.payload);
  case NOTE_ACTION_TYPES.FETCH_SUCCESS:
  case NOTE_ACTION_TYPES.ADD_SUCCESS:
  case NOTE_ACTION_TYPES.EDIT_SUCCESS:
    return Object.assign({...state}, {isFetching: false, err: null, isNew: false}, action.payload);
  case NOTE_ACTION_TYPES.FETCH_FAILURE:
    return Object.assign({...state}, { err: action.payload, isNew: action.payload.response.status === 404, isFetching: false });
  case NOTE_ACTION_TYPES.ADD_FAILURE:
  case NOTE_ACTION_TYPES.EDIT_FAILURE:
    return Object.assign({...state}, { err: action.payload, isFetching: false });
  default:
    return state;
  }
};
