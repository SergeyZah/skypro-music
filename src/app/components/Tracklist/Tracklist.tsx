import { data } from '@/data';
import Listheader from '../Listheader/Listheader';
import styles from './trackllist.module.css'
import Track from '../Track/Track';

export default function Tracklist() {
    return (
        <div className={styles.centerblock__content}>
        <Listheader />
        <div className={styles.content__playlist}>
          {data.map((track) => {
            return (
              <Track
                key={track._id}
                name={track.name}
                author={track.author}
                album={track.album}
                time={track.duration_in_seconds}
              />
            );
          })}
        </div>
      </div>
    );
}