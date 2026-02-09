'use client';

import Link from 'next/link';
import styles from './track.module.css';
import { formatTime } from '@/utils/helper';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlayList,
  setCurrentTrack,
  setIsPlay,
} from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';
import classnames from 'classnames';
import { useLikeTrack } from '@/hooks/useLikeTracks';

type TrackTypeProp = {
  track: TrackType;
  playList: TrackType[];
};

export default function Track({ track, playList }: TrackTypeProp) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const { toggleLike, isLike } = useLikeTrack(track);

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
    dispatch(setCurrentPlayList(playList));
  };

  const onClickLike = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    toggleLike();
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
            {currentTrack?._id === track._id ? (
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="16.000000"
                height="16.000000"
                fill="none"
                className={classnames(styles.track__titleSvg1, {
                  [styles.icon]: isPlay,
                })}
              >
                <path
                  id="Rectangle 3776"
                  d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0Z"
                  fill="rgb(181.661,113.688,255)"
                  fillRule="nonzero"
                />
              </svg>
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
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
          <svg className={styles.track__timeSvg} onClick={onClickLike}>
            <use
              xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-like' : 'icon-dislike'}`}
            ></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
