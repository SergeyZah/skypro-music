/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks, filteredTracks, filters } =
    useAppSelector((state) => state.tracks);
  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  useEffect(() => {
    const currentPlaylist = filters.authors.length ? filteredTracks : allTracks;
    setPlaylist(currentPlaylist);
  }, [filteredTracks, allTracks, filters]);

  return (
    <>
      <Centerblock
        pagePlaylist={allTracks}
        playList={playlist}
        isLoading={fetchIsLoading}
        error={fetchError}
      />
    </>
  );
}
