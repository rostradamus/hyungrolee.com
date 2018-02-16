import { GET_POSTS } from './actionTypes';
import axios from 'axios';

export const getPosts = () => {
	return async dispatch => {
		const res = await axios.get('/posts');
		dispatch({type: GET_POSTS, payload: res.data});
	}
}