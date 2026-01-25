import styles from './centerblock.module.css';
import Filter from '../Filter/Filter'; 
import Search from '../Search/Search';
import Tracklist from '../Tracklist/Tracklist';
import { TrackType } from '@/sharedTypes/sharedTypes';

type TrackListTypeProp = {
  playList: TrackType[];
  namePlaylist?: string;
  isLoading: boolean;
  error: string;
};

export default function Centerblock({playList, namePlaylist, isLoading, error}: TrackListTypeProp) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{namePlaylist || 'Треки'}</h2>
      <Filter playList={playList}/>
      <Tracklist playList={playList} isLoading={isLoading} error={error}/>
    </div>
  );
}
