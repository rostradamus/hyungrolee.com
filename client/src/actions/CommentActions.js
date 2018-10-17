import { COMMENT_ACTION_TYPES } from "./actionTypes";

export default class CommentActions {
  static addComment(data) {
    return async dispatch => {
      let res;
      dispatch({
        type: COMMENT_ACTION_TYPES.ADD_COMMENT_REQUEST,
        payload: {
          isFetching: true
        }
      });
    }
  }

  static deleteComment(data) {
    return async dispatch => {
    }
  }

  static getComment() {

  }

  static getComments(data) {
    // POST ID
    // COMMENT ARRAY
    let res;
    dispatch({
      type: COMMENT_ACTION_TYPES.FETCH_COMMENTS_REQUEST,
      payload: {
        isFetching: true
      }
    });
    try {
    }
  }
}