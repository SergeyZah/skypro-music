'use client';

import { getTracks, getTracksFavorite } from '@/services/tracks/tracksApi';
import {
  setAllTracks,
  setFavoriteTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReauth } from '@/utils/withReAuth';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks, favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (allTracks.length) {
      dispatch(setAllTracks(allTracks));
    } else {
      dispatch(setFetchIsLoading(true));
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
        })
        .catch((error) => {
          if (error instanceof AxiosError)
            if (error.response) {
              dispatch(setFetchError(error.response.data));
            } else if (error.request) {
              dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
              console.log(error);
            } else {
              dispatch(setFetchError('Неизвестная ошибка'));
            }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    }
  }, []);

  useEffect(() => {
    if (access) {
      if (favoriteTracks.length) {
        dispatch(setFavoriteTracks(favoriteTracks));
      } else {
        dispatch(setFetchIsLoading(true));
        withReauth(
          (newToken) => getTracksFavorite(newToken || access),
          refresh,
          dispatch,
        )
          .then((res) => {
            dispatch(setFavoriteTracks(res));
          })
          .catch((error) => {
            console.log(error);
            if (error instanceof AxiosError)
              if (error.response) {
                dispatch(setFetchError(error.response.data));
                console.log(error.response.data);
              } else if (error.request) {
                dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
                console.log(error);
              } else {
                dispatch(setFetchError('Неизвестная ошибка'));
              }
          })
          .finally(() => {
            dispatch(setFetchIsLoading(false));
          });
      }
    }
  }, [access, refresh]);
  return <></>;
}
