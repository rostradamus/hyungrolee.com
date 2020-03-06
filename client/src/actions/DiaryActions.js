import { DIARY_ACTION_TYPES } from "./actionTypes";
import moment from "moment";
import axios from "axios";

export const fetchDiaries = () => {
  return async dispatch => {
    let res;
    dispatch({
      type: DIARY_ACTION_TYPES.FETCH_REQUEST
    });
    try {
      res = await axios.get("/api/diaries");
      res = res.data.map(convertDateType);
      dispatch({
        type: DIARY_ACTION_TYPES.FETCH_SUCCESS,
        payload: {
          items: res
        }
      });
    } catch (err) {
      dispatch({
        type: DIARY_ACTION_TYPES.FETCH_FAILURE,
        payload: {
          err: err.message
        }
      });
    }
  };
};

export const fetchDiaryById = id => {
  return async dispatch => {
    let res;
    dispatch({
      type: DIARY_ACTION_TYPES.FETCH_REQUEST
    });
    try {
      res = await axios.get(`/api/diaries/${id}`);
      const selected = convertDateType(res.data);
      dispatch({
        type: DIARY_ACTION_TYPES.FETCH_SUCCESS,
        payload: {
          selected: selected
        }
      });
    } catch (err) {
      dispatch({
        type: DIARY_ACTION_TYPES.FETCH_FAILURE,
        payload: {
          err: err.message
        }
      });
    }
  };
};

export const addDiary = data => {
  return async dispatch => {
    let res;
    dispatch({
      type: DIARY_ACTION_TYPES.ADD_REQUEST
    });
    try {
      res = await axios.post("/api/diaries", data);
      dispatch({
        type: DIARY_ACTION_TYPES.ADD_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: DIARY_ACTION_TYPES.ADD_FAILURE,
        payload: {
          err: err.message
        }
      });
    }
  };
};

export const unmountSelected = () => {
  return dispatch => {
    dispatch({
      type: DIARY_ACTION_TYPES.FETCH_SUCCESS,
      payload: {
        selected: null
      }
    });
  };
};

const convertDateType = rawItem =>
  Object.assign({...rawItem }, {
    start: moment(rawItem.start),
    end: moment(rawItem.end),
    created_at: moment(rawItem.created_at)
  });
