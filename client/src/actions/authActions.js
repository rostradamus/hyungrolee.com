import { userConstants } from './actionTypes';
import axios from 'axios';

const authActions = dispatch => ({
    fetchUser: async () => {
        console.log('fetch is called!');
        let res;
        dispatch(request(res));
        try {
            res = await axios.get('users/current_user');
            dispatch(success(res.data));
        }
        catch (err) {
            dispatch(failure(err));
        }
        function request(user) { return { type: userConstants.LOGIN_REQUEST, payload:user }; }
        function success(user) { return { type: userConstants.LOGIN_SUCCESS, payload:user }; }
        function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload:error }; }
    },
    onClickHandler: async (username, password) => {
        console.log('onClickHandler is called!');
        dispatch(request({ username }));
        let res;
        try {
            res = await axios.post('/users/authenticate', { username, password });
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