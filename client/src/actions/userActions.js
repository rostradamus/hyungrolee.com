import { userConstants } from './actionTypes';
import axios from 'axios';

const userActions = dispatch => ({
	fetch: async () => {
		console.log('fetch is called!');
		let user;
		dispatch(request(user));
		try {
			user = await axios.get('users/current_user');
			dispatch(success(user));
		}
		catch (err) {
			dispatch(failure(err));
		}
		function request(user) { return { type: userConstants.LOGIN_REQUEST, payload:user } }
	    function success(user) { return { type: userConstants.LOGIN_SUCCESS, payload:user } }
	    function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload:error } }
	},
	onClickHandler: async (username, password) => {
		console.log('onClickHandler is called!');
		dispatch(request({ username }));
		let user;
		try {
			user = await axios.post('/users/authenticate', { username, password });
			dispatch(success(user));
		}
		catch (err) {
			dispatch(failure(err));
		}
	    function request(user) { return { type: userConstants.LOGIN_REQUEST, payload:user } }
	    function success(user) { return { type: userConstants.LOGIN_SUCCESS, payload:user } }
	    function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload:error } }
	}
});

export default userActions;