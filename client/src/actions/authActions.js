import { userConstants } from "./actionTypes";
import axios from "axios";

export default class AuthActions {
  static fetchUserSession() {
    return async dispatch => {
      let res;
      dispatch(this._requestLogin(res));
      try {
        res = await axios.get("/api/user/current_user");
        dispatch(this._resolveLogin(res.data));
      } catch (err) {
        dispatch(this._failLogin(err));
      }
    };
  }

  static login(email, password) {
    return async dispatch => {
      let res;
      dispatch(this._requestLogin({ email }));
      try {
        res = await axios.post("/api/user", { email, password });
        dispatch(this._resolveLogin(res.data));
      } catch (err) {
        dispatch(this._failLogin(err));
        // TODO: shouldn't be hardcoded here in the front-end
        throw new Error("Please check your email address or password");
      }
    };
  }

  static register(oBody) {
    return async dispatch => {
      let res;
      dispatch(this._requestRegister(oBody));
      try {
        res = await axios.post("/api/user/register", oBody);
        dispatch(this._resolveRegister(res.data));
      } catch (err) {
        dispatch(this._failRegister(err));
        // TODO: shouldn't use err.response.data, instead should use e.message
        throw new Error(err.response.data.errmsg);
      }
    };
  }

  static _requestLogin(data) {
    return { type: userConstants.LOGIN_REQUEST, payload: data };
  }

  static _resolveLogin(user) {
    return { type: userConstants.LOGIN_SUCCESS, payload: user };
  }

  static _failLogin() {
    return { type: userConstants.LOGIN_FAILURE, payload: {} };
  }

  static _requestRegister(data) {
    return { type: userConstants.REGISTER_REQUEST, payload: data };
  }

  static _resolveRegister(user) {
    return { type: userConstants.REGISTER_SUCCESS, payload: user };
  }

  static _failRegister(error) {
    return { type: userConstants.REGISTER_FAILURE, payload: error };
  }
}
