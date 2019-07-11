import {
  SET_DROPS,
  LOADING_DATA,
  LIKE_DROP,
  UNLIKE_DROP,
  DELETE_DROP,
  SET_ERRORS,
  POST_DROP,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_DROP,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

// Get all drops
export const getDrops = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/drops')
    .then((res) => {
      dispatch({
        type: SET_DROPS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_DROPS,
        payload: []
      });
    });
};
export const getDrop = (dropId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/drop/${dropId}`)
    .then((res) => {
      dispatch({
        type: SET_DROP,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a drop
export const postDrop = (newDrop) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/drop', newDrop)
    .then((res) => {
      dispatch({
        type: POST_DROP,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a drop
export const likeDrop = (dropId) => (dispatch) => {
  axios
    .get(`/drop/${dropId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_DROP,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a drop
export const unlikeDrop = (dropId) => (dispatch) => {
  axios
    .get(`/drop/${dropId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_DROP,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (dropId, commentData) => (dispatch) => {
  axios
    .post(`/drop/${dropId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteDrop = (dropId) => (dispatch) => {
  axios
    .delete(`/drop/${dropId}`)
    .then(() => {
      dispatch({ type: DELETE_DROP, payload: dropId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_DROPS,
        payload: res.data.drops
      });
    })
    .catch(() => {
      dispatch({
        type: SET_DROPS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};