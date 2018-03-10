import { GET_POSTS } from './actionTypes';
import axios from 'axios';

export const postActions = dispatch => ({
	getPosts: async () => {
		const res = await axios.get('/posts');
		dispatch({type: GET_POSTS, payload: res.data});
	}
});