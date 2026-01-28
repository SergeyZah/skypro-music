import Listheader from '../Listheader/Listheader';
import styles from './trackllist.module.css';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Loading from '../Loading/Loading';

type TrackListTypeProp = {
  playList: TrackType[];
  isLoading: boolean;
  error: string;
};

export default function Tracklist({
  playList,
  isLoading,
  error,
}: TrackListTypeProp) {
  console.log(isLoading);
  return (
    <div className={styles.centerblock__content}>
      <Listheader />
      {error ? (
        <div className={styles.errorContainer}>{error}</div>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className={styles.content__playlist}>
          {playList.map((track) => {
            return <Track key={track._id} track={track} playList={playList} />;
          })}
        </div>
      )}
    </div>
  );
}
