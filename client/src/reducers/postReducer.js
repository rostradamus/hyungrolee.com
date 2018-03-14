import { GET_POSTS } from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type) {
    case GET_POSTS: {
        return action.payload;
    }
    default:
        return state;
    }
};