import {
  setAccessToken,
  setRefreshToken,
  setUsername,
} from '@/store/features/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useInitAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const access = localStorage.getItem('access') || '';
    const refresh = localStorage.getItem('refresh') || '';
    const username = localStorage.getItem('username') || '';

    dispatch(setAccessToken(access));
    dispatch(setRefreshToken(refresh));
    dispatch(setUsername(username));
  }, [dispatch]);
};
