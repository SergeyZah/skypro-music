import Link from 'next/link';
import styles from './track.module.css';

export default function Track({
  key,
  title,
  author,
  album,
  time,
  span,
}: {
  key: number;
  title: string;
  author: string;
  album: string;
  time: string;
  span: string;
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
              {title} <span className={styles.track__titleSpan}>{span}</span>
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
          <span className={styles.track__timeText}>{time}</span>
        </div>
      </div>
    </div>
  );
}
