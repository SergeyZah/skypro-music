import axios from 'axios';
import { BASE_URL } from '../constants';

type signInTypeProp = {
  email: string;
  password: string;
};

type signInReturnType = {
  data: {
    email: string;
    username: string;
    _id: number | string;
  };
};

type signUpTypeProp = {
  email: string;
  password: string;
  username: string;
};

type signUpReturnType = {
  message: string;
  result: {
    username: string;
    email: string;
    _id: number | string;
  };
  success: true;
};

type getTokenTypeProp = {
  email: string;
  password: string;
};

type getTokenReturnType = {
  data: {
    refresh: string;
    access: string;
  };
};

type refreshTokenTypeProp = {
  refresh: string;
};

type refreshTokenReturnType = {
  access: string;
};

export const signIn = (data: signInTypeProp): Promise<signInReturnType> => {
  return axios.post(BASE_URL + '/user/login/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const signUp = (data: signUpTypeProp): Promise<signUpReturnType> => {
  return axios.post(BASE_URL + '/user/signup/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const getToken = (
  data: getTokenTypeProp,
): Promise<getTokenReturnType> => {
  return axios
    .post(BASE_URL + '/user/token/', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.data);
};

export const refreshToken = (data: refreshTokenTypeProp): Promise<refreshTokenReturnType> => {
  return axios
    .post(BASE_URL + '/user/token/refresh/', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.data);
};
