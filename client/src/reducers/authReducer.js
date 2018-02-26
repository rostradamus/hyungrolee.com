import { userConstants } from '../actions/actionTypes';

export default (state = null, action) => {
	switch (action.type) {
		case userConstants.LOGIN_REQUEEST: {
			return action.payload || null;
		}
		case userConstants.LOGIN_SUCCESS: {
			return action.payload || null;
		}
		default:
			return state;
	}
}