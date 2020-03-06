import { DIARY_ACTION_TYPES } from "Actions/actionTypes";

const initialState = {
  isFetching: false,
  items: [],
  selected: null,
  err: null
};
export default (state = initialState, action) => {
  switch (action.type) {
  case DIARY_ACTION_TYPES.FETCH_REQUEST:
  case DIARY_ACTION_TYPES.ADD_REQUEST: {
    return Object.assign({...state}, {isFetching: true}, action.payload);
  }
  case DIARY_ACTION_TYPES.FETCH_SUCCESS: {
    return Object.assign({...state}, {isFetching: false}, action.payload);
  }

  case DIARY_ACTION_TYPES.ADD_SUCCESS: {
    const newItems = state.items.concat(action.payload);
    return Object.assign({...state}, { isFetching: false, items: newItems });
  }

  case DIARY_ACTION_TYPES.EDIT_REQUEST:
  case DIARY_ACTION_TYPES.DELETE_REQUEST:
  case DIARY_ACTION_TYPES.FETCH_FAILURE:
  case DIARY_ACTION_TYPES.ADD_FAILURE:
  case DIARY_ACTION_TYPES.EDIT_FAILURE:
  case DIARY_ACTION_TYPES.DELETE_SUCCESS:
  case DIARY_ACTION_TYPES.DELETE_FAILURE: {
    return state;
  }
  default:
    return state;
  }
};
