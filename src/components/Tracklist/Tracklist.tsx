import Listheader from '../Listheader/Listheader';
import styles from './trackllist.module.css';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';

type TrackListTypeProp = {
  playList: TrackType[];
};

export default function Tracklist({playList}: TrackListTypeProp) {
  return (
    <div className={styles.centerblock__content}>
      <Listheader />
      <div className={styles.content__playlist}>
        {playList.map((track) => {
          return <Track key={track._id} track={track} playList={playList}/>;
        })}
      </div>
    </div>
  );
}
