'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { getTracks, getTracksSelection } from '@/services/tracks/tracksApi';
import { PlayListType, TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [namePlayList, setNamePlayList] = useState('');
  const [categoryTracks, setCategoryTracks] = useState<TrackType[]>([]);
  const [isLoadedTracks, setIsLoadedTracks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTracks()
      .then((res) => {
        setTracks(res);
        setIsLoadedTracks(true);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            setError('Что-то с интернетом');
          } else {
            setError('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false)
      });
  }, []);

  useEffect(() => {
    if (isLoadedTracks) {
      getTracksSelection(params.id)
        .then((res: PlayListType) => {
          setNamePlayList(res.name);

          const idItems = res.items;

          const filteredTracks = tracks.filter((track) =>
            idItems.includes(track._id),
          );

          setCategoryTracks(filteredTracks);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setError(error.response.data);
            } else if (error.request) {
              setError('Что-то с интернетом');
            } else {
              setError('Неизвестная ошибка');
            }
          }
        });
    }
  }, [params.id, tracks, isLoadedTracks]);

  return (
    <>
      <Centerblock playList={categoryTracks} namePlaylist={namePlayList} isLoading={isLoading} error={error}/>
    </>
  );
}
