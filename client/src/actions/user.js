import axios from 'axios';

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const AUTH = 'AUTH';

export const login = ({ email, password }) => {
  // 서버에 로그인 요청
  const request = axios
    .post('/api/users/login', { email, password })
    .then(res => res.data);

  return {
    type: LOGIN,
    payload: request,
  };
};

export const register = ({ email, name, password }) => {
  const request = axios
    .post('/api/users/register', {
      email,
      name,
      password,
    })
    .then(res => res.data);

  return {
    type: REGISTER,
    payload: request,
  };
};

export const auth = () => {
  const request = axios.get('/api/users/auth').then(res => res.data);

  return {
    type: AUTH,
    payload: request,
  };
};
