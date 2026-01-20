'use client'

import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true);

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
    .finally(() => {
      setIsLoading(false)
    })
  }, [])
  return (
    <>
    <Centerblock playList={tracks} isLoading={isLoading} error={error}/>
    </>
  );
}
