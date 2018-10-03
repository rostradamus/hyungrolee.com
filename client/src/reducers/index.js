import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    auth: authReducer,
    posts: postReducer,
    modal: modalReducer
});