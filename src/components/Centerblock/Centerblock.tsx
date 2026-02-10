'use client'

import styles from './centerblock.module.css';
import Filter from '../Filter/Filter'; 
import Search from '../Search/Search';
import Tracklist from '../Tracklist/Tracklist';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { setPagePlaylist } from '@/store/features/trackSlice';

type TrackListTypeProp = {
  pagePlaylist: TrackType[];
  playList: TrackType[];
  namePlaylist?: string;
  isLoading: boolean;
  error: string;
};

export default function Centerblock({playList, namePlaylist, isLoading, error, pagePlaylist}: TrackListTypeProp) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPagePlaylist(pagePlaylist))
  }, [pagePlaylist, dispatch])
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{namePlaylist || 'Треки'}</h2>
      <Filter playList={pagePlaylist}/>
      <Tracklist playList={playList} isLoading={isLoading} error={error}/>
    </div>
  );
}
