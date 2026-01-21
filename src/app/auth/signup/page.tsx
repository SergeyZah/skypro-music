'use client';

import { signUp } from '@/services/auth/authApi';
import styles from './signup.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { AxiosError } from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setError('');

    if (
      !email.trim() ||
      !username.trim() ||
      !password.trim() ||
      !repeatPassword.trim()
    ) {
      return setError('Необходимо заполнить все поля.');
    }

    if (password.trim() !== repeatPassword.trim()) {
      return setError('Пароли не совпадают.');
    }

    setIsLoading(true);

    try {
      const res = await signUp({ email, username, password });
      console.log('Ответ после регистрации: ', res);

      setIsLoading(false);

      router.push('/auth/signin');
    } catch (error) {
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
    }
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <Image width={140} height={21} src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={styles.modal__input}
        type="text"
        name="username"
        placeholder="Имя пользователя"
        onChange={onChangeUserName}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        onChange={onChangeRepeatPassword}
      />
      <div className={styles.errorContainer}>{error}</div>
      <button onClick={onSubmit} className={styles.modal__btnSignupEnt} disabled={isLoading}>
        Зарегистрироваться
      </button>
    </>
  );
}
