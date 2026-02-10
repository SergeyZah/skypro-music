/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import ProgressBar from '../ProgressBar/ProgressBar';
import { getTimePanel } from '@/utils/helper';
import { useLikeTrack } from '@/hooks/useLikeTracks';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);
  const { toggleLike, isLike } = useLikeTrack(currentTrack);

  const [isLoop, setIsLoop] = useState(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationTime, setDurationTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsLoadedTrack(false);
  }, [currentTrack]);

  if (!currentTrack) return <></>;

  const onTogglePlay = () => {
    if (isPlay) {
      audioRef.current?.pause();
      dispatch(setIsPlay(false));
    } else {
      audioRef.current?.play();
      dispatch(setIsPlay(true));
    }
  };

  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDurationTime(audioRef.current.duration);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
      setIsLoadedTrack(true);
    }
  };

  const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value) / 100;
    }
  };

  const onChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
    }
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const onEnded = () => {
    dispatch(setIsPlay(false));

    if (isLoop) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      dispatch(setNextTrack());
    }
  };

  const onClickLike = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    toggleLike();
  };

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        autoPlay
        src={currentTrack?.track_file}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      ></audio>
      <div className={styles.bar__content}>
        {isLoadedTrack ? (
          <></>
        ) : (
          <div className={styles.bar__loader}>Загрузка трека</div>
        )}
        <div className={styles.trackPlay__time}>
          {getTimePanel(currentTime, durationTime)}
        </div>
        <ProgressBar
          max={durationTime || 0}
          step={0.1}
          readOnly={!isLoadedTrack}
          value={currentTime || 0}
          onChange={onChangeProgress}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                onClick={onPrevTrack}
                className={classnames(styles.player__btnPrev, styles.btn)}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                onClick={onTogglePlay}
                className={classnames(styles.player__btnPlay, styles.btn)}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={`/img/icon/sprite.svg#icon-${isPlay ? 'pause' : 'play'}`}
                  ></use>
                </svg>
              </div>
              <div
                onClick={onNextTrack}
                className={classnames(styles.player__btnNext, styles.btn)}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={onToggleLoop}
                className={classnames(styles.player__btnRepeat, styles.btnIcon)}
              >
                <svg
                  className={classnames(styles.player__btnRepeatSvg, {
                    [styles.player__btnRepeatSvg_active]: isLoop,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                onClick={onToggleShuffle}
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                  { [styles.btnIcon_active]: isShuffle },
                )}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classnames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg
                    className={styles.trackPlay__likeSvg}
                    onClick={onClickLike}
                  >
                    <use
                      xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-like' : 'icon-dislike'}`}
                    ></use>
                  </svg>
                </div>
                <div
                  className={classnames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classnames(styles.volume__progress, styles.btn)}>
                <input
                  className={classnames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  onChange={onChangeVolume}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
