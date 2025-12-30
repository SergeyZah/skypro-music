'use client'

import Link from 'next/link';
import styles from './track.module.css';
import { formatTime } from '@/utils/helper';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';

type TrackTypeProp = {
  track: TrackType;
};

export default function Track({ track }: TrackTypeProp) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay)

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
  };
  return (
    <div
      className={styles.playlist__item}
      key={track._id}
      onClick={onClickTrack}
    >
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className={'track__title-text'}>
            <Link className={styles.track__titleLink} href="">
              {track.name} <span className={styles.track__titleSpan}>{}</span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className="track__time">
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
