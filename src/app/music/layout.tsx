'use client'

import { ReactNode, useEffect } from 'react';
import styles from './layout.module.css';
import Navigate from '@/components/Navigate/Navigate';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { useInitAuth } from '@/hooks/useInitAuth';
import { useDispatch } from 'react-redux';
import { setFavoriteTracks } from '@/store/features/trackSlice';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const dispatch = useDispatch();

  useInitAuth()

  useEffect(() => {
    const saveFavoritesTracks = localStorage.getItem('favoriteTracks');
    const favoriteTracks = saveFavoritesTracks ? JSON.parse(saveFavoritesTracks) : []
    dispatch(setFavoriteTracks(favoriteTracks));
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
