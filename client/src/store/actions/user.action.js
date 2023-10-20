import axios from 'axios';

export const ROOT_API = 'http://localhost:5000/api';

export const REGISTER_REQUEST = '[USER] REGISTER REQUEST';
export const REGISTER_SUCCESS = '[USER] REGISTER SUCCESS';
export const REGISTER_FAILURE = '[USER] REGISTER FAILURE';

export const LOGIN_REQUEST = '[USER] LOGIN REQUEST';
export const LOGIN_SUCCESS = '[USER] LOGIN SUCCESS';
export const LOGIN_FAILURE = '[USER] LOGIN FAILURE';

export const TOKEN_LOGIN_REQUEST = '[USER] TOKEN LOGIN REQUEST';
export const TOKEN_LOGIN_SUCCESS = '[USER] TOKEN LOGIN SUCCESS';
export const TOKEN_LOGIN_FAILURE = '[USER] TOKEN LOGIN FAILURE';

export const registerUser = (data) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  return axios.post(`${ROOT_API}/user/register`, data)
    .then(({ data }) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data
      });

      return data;
    })
    .catch(error => {
      dispatch({
        type: REGISTER_FAILURE,
        error
      });
    });
}

export const loginUser = (data) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  return axios.post(`${ROOT_API}/user/login`, data)
    .then(({ data }) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data
      });

      if (data.success) {
        localStorage.setItem('access-token', data.token);
      }

      return data;
    })
    .catch(error => {
      dispatch({
        type: LOGIN_FAILURE,
        error
      });
    });
}

export const loginWithFace = (faceDescriptor) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  return axios.post(`${ROOT_API}/user/face-login`, { faceDescriptor })
    .then(({ data }) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data
      });

      if (data.success) {
        localStorage.setItem('access-token', data.token);
      }

      return data;
    })
    .catch(error => {
      dispatch({
        type: LOGIN_FAILURE,
        error
      });
    });
}

export const loginWithToken = () => (dispatch) => {
  dispatch({ type: TOKEN_LOGIN_REQUEST });
  const token = localStorage.getItem('access-token');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(`${ROOT_API}/user/access-token`)
    .then(({ data }) => {
      console.log(data);

      dispatch({
        type: TOKEN_LOGIN_SUCCESS,
        payload: data
      });

      return data;
    })
    .catch(error => {
      dispatch({
        type: TOKEN_LOGIN_FAILURE,
        error
      });

      return error;
    });
}
