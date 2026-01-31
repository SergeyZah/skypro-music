'use client';

import { getTokens, signIn } from '@/services/auth/authApi';
import styles from './signin.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setUsername,
} from '@/store/features/authSlice';

export default function Signin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setError('');

    if (!email.trim() && !password.trim()) {
      return setError('Необходимо заполнить все поля.');
    } else if (!email.trim()) {
      return setError('Введите адрес эл.почты.');
    } else if (!password.trim()) {
      return setError('Введите пароль');
    }

    setIsLoading(true);

    signIn({ email, password })
      .then((res) => {
        dispatch(setUsername(res.data.username));
        localStorage.setItem('userId', String(res.data._id));

        return getTokens({ email, password })
      })
      .then((response) => {
        dispatch(setAccessToken(response.access));
        dispatch(setRefreshToken(response.refresh));
        router.push('/music/main');
      })
      .catch((error) => {
        setIsLoading(false);
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data.message);
          } else if (error.request) {
            setError('Отсутствует интернет. Попробуйте позже');
          } else {
            setError('Неизвестная ошибка');
          }
        }
        console.log('error: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <Image width={140} height={21} src="/img/logo_modal.png" alt="logo" />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{error}</div>
      <button
        className={styles.modal__btnEnter}
        onClick={onSubmit}
        disabled={isLoading}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
