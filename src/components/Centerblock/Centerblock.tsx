import styles from './centerblock.module.css';
import Filter from '../Filter/Filter'; 
import Search from '../Search/Search';
import Tracklist from '../Tracklist/Tracklist';
import { TrackType } from '@/sharedTypes/sharedTypes';

type TrackListTypeProp = {
  playList: TrackType[];
};

export default function Centerblock({playList}: TrackListTypeProp) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <Tracklist playList={playList}/>
    </div>
  );
}
