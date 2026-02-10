import { setFavoriteTracks } from '@/store/features/trackSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useInitFavoriteTracks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const favoriteTracks = JSON.parse(localStorage.getItem('favoriteTracks') || '{}');
    console.log(favoriteTracks);

    dispatch(setFavoriteTracks(favoriteTracks));
  }, [dispatch]);
};
