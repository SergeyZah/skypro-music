'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './navigate.module.css';
import { useState } from 'react';
import classnames from 'classnames';

export default function Navigate() {
  const [isNavigate, setIsNavigate] = useState(false);
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem('userId'));

  const changeVisibleNavigate = () => {
    if (isNavigate) {
      setIsNavigate(false);
    } else {
      setIsNavigate(true);
    }
  };

  const handleExit = () => {
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    setIsAuth(false)
  }

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
      <div
        className={classnames(styles.nav__menu, {
          [styles.active]: isNavigate === true,
        })}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="/music/main" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="#" className={styles.menu__link}>
              Мои треки
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="/auth/signin" className={styles.menu__link} onClick={handleExit}>
              {isAuth ? 'Выйти' : 'Войти'}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
