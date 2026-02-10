'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { useAppSelector } from '@/store/store';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const username = useAppSelector((state) => state.auth.username);

  const handleExit = () => {
    dispatch(clearUser());
    localStorage.removeItem('userId');
    router.push('/music/main')
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{username || 'Гость'}</p>
        <div className={styles.sidebar__icon}>
          <div
            className={styles.sidebar__link}
            onClick={handleExit}
          >
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#logout"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
                priority
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
