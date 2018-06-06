import { userConstants } from './actionTypes';
import axios from 'axios';

const authActions = dispatch => ({
    fetchUser: async function() {
        let res;
        dispatch(this._request(res));
        try {
            res = await axios.get('/api/user/current_user');
            dispatch(this._success(res.data));
        }
        catch (err) {
            dispatch(this._failure(err));
        }
    },
    onClickHandler: async function(email, password) {
        dispatch(this._request({ email }));
        let res;
        try {
            res = await axios.post('/api/user/authenticate', { email, password });
            dispatch(this._success(res.data));
        }
        catch (err) {
            dispatch(this._failure(err));
        }
    },
    _request: user => ({ type: userConstants.LOGIN_REQUEST, payload:user }),
    _success: user => ({ type: userConstants.LOGIN_SUCCESS, payload:user }),
    _failure: error => ({ type: userConstants.LOGIN_FAILURE, payload:error })
});

export default authActions;