import { userConstants } from './actionTypes';
import axios from 'axios';

const authActions = dispatch => ({
    fetchUser: async () => {
        let res;
        dispatch(request(res));
        try {
            res = await axios.get('/api/user/current_user');
            dispatch(success(res.data));
        }
        catch (err) {
            dispatch(failure(err));
        }
        function request(user) { return { type: userConstants.LOGIN_REQUEST, payload:user }; }
        function success(user) { return { type: userConstants.LOGIN_SUCCESS, payload:user }; }
        function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload:error }; }
    },
    onClickHandler: async (email, password) => {
        dispatch(request({ email }));
        let res;
        try {
            res = await axios.post('/api/user/authenticate', { email, password });
            dispatch(success(res.data));
        }
        catch (err) {
            dispatch(failure(err));
        }
        function request(user) { return { type: userConstants.LOGIN_REQUEST, payload:user } }
        function success(user) { return { type: userConstants.LOGIN_SUCCESS, payload:user } }
        function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload:error } }
    }
});

export default authActions;