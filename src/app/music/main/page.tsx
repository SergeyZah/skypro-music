'use client'

import Navigate from '@/components/Navigate/Navigate';
import styles from './page.module.css';
import Centerblock from '@/components/Centerblock/Centerblock';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('')

  useEffect(() => {
    getTracks()
    .then((res) => {
      setTracks(res);
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          setError(error.response.data);
        } else if (error.request) {
          setError('Что-то с интернетом');
        } else {
          setError('Неизвестная ошибка')
        }
      }
    })
  }, [])
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigate />
          <Centerblock playList={tracks}/>
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
