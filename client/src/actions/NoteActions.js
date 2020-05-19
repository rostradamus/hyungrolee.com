import { NOTE_ACTION_TYPES } from "./actionTypes";
// import moment from "moment";
import axios from "axios";

export const fetchNote = () => {
  return async dispatch => {
    dispatch({
      type: NOTE_ACTION_TYPES.FETCH_REQUEST
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const res = await axios.get("/api/note");
      dispatch({
        type: NOTE_ACTION_TYPES.FETCH_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NOTE_ACTION_TYPES.FETCH_FAILURE,
        payload: err
      });
    }
  };
};

export const initNote = (body) => {
  return async dispatch => {
    dispatch({
      type: NOTE_ACTION_TYPES.ADD_REQUEST
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const res = await axios.post("/api/note", body);
      dispatch({
        type: NOTE_ACTION_TYPES.ADD_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NOTE_ACTION_TYPES.ADD_FAILURE,
        payload: err
      });
    }
  };
};
