'use client';

import { ReactNode, useEffect } from 'react';
import styles from './layout.module.css';
import Navigate from '@/components/Navigate/Navigate';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { useInitAuth } from '@/hooks/useInitAuth';
import { useDispatch } from 'react-redux';
import {
  setFavoriteTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';
import { useAppSelector } from '@/store/store';
import { getTracksFavorite } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';
import { withReauth } from '@/utils/withReAuth';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const dispatch = useDispatch();
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);

  useInitAuth();

  useEffect(() => {
    const saveFavoritesTracks = localStorage.getItem('favoriteTracks');
    const favoriteTracks = saveFavoritesTracks
      ? JSON.parse(saveFavoritesTracks)
      : [];
    dispatch(setFavoriteTracks(favoriteTracks));

    if (favoriteTracks.length) {
      dispatch(setFavoriteTracks(favoriteTracks));
    } else {
      dispatch(setFetchIsLoading(true));
      withReauth(
        (newToken) => getTracksFavorite(newToken || access),
        refresh,
        dispatch,
      )
        .then((res) => {
          dispatch(setFavoriteTracks(res));
        })
        .catch((error) => {
          if (error instanceof AxiosError)
            if (error.response) {
              dispatch(setFetchError(error.response.data));
            } else if (error.request) {
              dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
              console.log(error);
            } else {
              dispatch(setFetchError('Неизвестная ошибка'));
            }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    }
  }, [dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <FetchingTracks />
            <Navigate />
            {children}
            <Sidebar />
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
