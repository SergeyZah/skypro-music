import Link from 'next/link';
import styles from './track.module.css';
import { formatTime } from '@/utils/helper';

export default function Track({
  key,
  name,
  author,
  album,
  time,
  span,
}: {
  key: number;
  name: string;
  author: string;
  album: string;
  time: number;
  span?: string;
}) {
  return (
    <div className={styles.playlist__item} key={key}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className={'track__title-text'}>
            <Link className={styles.track__titleLink} href="">
              {name} <span className={styles.track__titleSpan}>{span}</span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {album}
          </Link>
        </div>
        <div className="track__time">
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
}
