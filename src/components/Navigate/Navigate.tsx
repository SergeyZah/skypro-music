/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './navigate.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';

export default function Navigate() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isNavigate, setIsNavigate] = useState(false);
  const { access } = useAppSelector((state) => state.auth);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (!access) {
      setIsAuth(false);
      return;
    } else if (access) {
      setIsAuth(true);
    }
  }, [access]);

  const changeVisibleNavigate = () => {
    setIsNavigate(!isNavigate)
  };

  const handleExit = () => {
    dispatch(clearUser());
    setIsAuth(false);
    router.push(`${isAuth ? '/music/main' : '/auth/signin'}`);
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link className={styles.nav__link} href="/music/main">
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={'logo'}
          />
        </Link>
      </div>
      <div onClick={changeVisibleNavigate} className={styles.nav__burger}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isNavigate ? (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/music/main" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            {isAuth ? (
              <li className={styles.menu__item}>
                <Link href="/music/favorite" className={styles.menu__link}>
                  Мои треки
                </Link>
              </li>
            ) : (
              <></>
            )}
            <li className={styles.menu__item}>
              <div className={styles.menu__link} onClick={handleExit}>
                {isAuth ? 'Выйти' : 'Войти'}
              </div>
            </li>
          </ul>
        </div>
      ) : (<></>)}
    </nav>
  );
}
