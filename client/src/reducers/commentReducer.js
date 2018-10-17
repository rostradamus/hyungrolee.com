import { COMMENT_ACTION_TYPES } from 'Actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
    case COMMENT_ACTION_TYPES.FETCH_COMMENTS: {
        return Object.assign({... state}, action.payload);
    }
    default:
        return state;
    }
};