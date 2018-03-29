import { GET_POSTS } from './actionTypes';
import axios from 'axios';

const postActions = dispatch => ({
    getPosts: async () => {
        const res = await axios.get('/api/post');
        dispatch({type: GET_POSTS, payload: res.data});
    },
    submitPost: async (data) => {
        let res;
        try {
            res = await axios.post('/api/post/new', data);
        } catch (err) {
            alert(err);
        }
        if (res.status === 200) {
            window.location = '/post/list';
        }
    }
});

export default postActions;