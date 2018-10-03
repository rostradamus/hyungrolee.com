import { GET_POSTS } from './actionTypes';
import axios from 'axios';

export default class PostActions {
  static fetchPosts() {
    return async dispatch => {
      const res = await axios.get('/api/post');
      dispatch({type: GET_POSTS, payload: res.data});
    };
  }

  static createPost(data) {
    return async () => {
      let res;
      try {
        res = await axios.post('/api/post/new', data);
        if (res.status === 200) {
          window.location = '/post/detail/' + res.data._id;
        }
      } catch (err) {
        alert(err);
      }
    };
  }

  static editPost(data) {
    return async () => {
      let res;
      try {
        res = await axios.post('/api/post/edit', data);
        if (res.status === 200) {
          window.location = "/post/detail/" + res.data._id;
        }
      } catch (err) {
        alert(err);
      }
    };
  }
}