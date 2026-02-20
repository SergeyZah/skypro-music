'use client';

import { ReactNode, useEffect } from 'react';
import styles from './layout.module.css';
import Navigate from '@/components/Navigate/Navigate';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { useInitAuth } from '@/hooks/useInitAuth';
import { useAppSelector } from '@/store/store';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const {fetchIsLoading} = useAppSelector((state) => state.tracks)

  useInitAuth();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <FetchingTracks />
            <Navigate />
            {children}
            <Sidebar isLoading={fetchIsLoading}/>
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
