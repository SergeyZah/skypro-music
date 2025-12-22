import styles from './centerblock.module.css';
import Filter from '../Filter/Filter';
import Track from '../Track/Track';
import ContentHeader from '../Content/ContentHeader';
import Search from '../Search/Search';
import { data } from '@/data';

export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <div className={styles.centerblock__content}>
        <ContentHeader />
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
    </div>
  );
}
