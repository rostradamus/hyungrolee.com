import { userConstants } from "./actionTypes";
import axios from "axios";

const loginAction = {
  _request: user => ({ type: userConstants.LOGIN_REQUEST, payload: user }),
  _success: user => ({ type: userConstants.LOGIN_SUCCESS, payload: user }),
  _failure: error => ({ type: userConstants.LOGIN_FAILURE, payload: error })
};
const registerAction = {
  _request: user => ({ type: userConstants.REGISTER_REQUEST, payload: user }),
  _success: user => ({ type: userConstants.REGISTER_SUCCESS, payload: user }),
  _failure: error => ({ type: userConstants.REGISTER_FAILURE, payload: error })
};

const authActions = dispatch => ({
  fetchUser: async function() {
    let res;
    dispatch(loginAction._request(res));
    try {
      res = await axios.get("/api/user/current_user");
      dispatch(loginAction._success(res.data));
    } catch (err) {
      dispatch(loginAction._failure(err));
    }
  },

  onLoginSubmit: async function(email, password) {
    dispatch(loginAction._request({ email }));
    let res;
    try {
      res = await axios.post("/api/user/authenticate", { email, password });
      dispatch(loginAction._success(res.data));
    } catch (err) {
      dispatch(loginAction._failure(err));
    }
  },

  onRegisterSubmit: async function(oBody) {
    let res;
    dispatch(registerAction._request(res));
    try {
      res = await axios.post("/api/user/register", oBody);
      dispatch(registerAction._success(res.data));
    } catch (err) {
      dispatch(registerAction._failure(err));
      // TODO: shouldn't use err.response.data, instead should use e.message
      throw new Error(err.response.data.errmsg);
    }
  }
});

export default authActions;