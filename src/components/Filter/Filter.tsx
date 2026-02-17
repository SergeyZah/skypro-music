'use client';

import { useState } from 'react';
import FilterItem from '../FilterItem/FilterItem';
import styles from './filter.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch } from '@/store/store';
import { getUniqueValuesByKey } from '@/utils/helper';
import {
  setFIlterAuthors,
  setFIlterGenres,
  setFilterYears,
} from '@/store/features/trackSlice';

type FilterTypeProp = {
  playList: TrackType[];
};

export default function Filter({ playList }: FilterTypeProp) {
  const [activeFilter, setActiveFilter] = useState<null | string>(null);
  const [isActiveAuthorId, setIsActiveAuthorId] = useState<string[]>([]);
  const [isActiveGenreId, setIsActiveGenreId] = useState<string[]>([]);
  const [isActiveYearId, setIsActiveYearId] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const changeActiveFilter = (filterType: string) => {
    if (activeFilter === filterType) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterType);
    }
  };

  const uniqAuthors = getUniqueValuesByKey(playList, 'author');
  const uniqGenres = getUniqueValuesByKey(playList, 'genre');
  const years = ['Сначала новые', 'Сначала старые', 'По умолчанию'];

  const onSelectAuthor = (author: string, id: string) => {
    dispatch(setFIlterAuthors(author));
    if (isActiveAuthorId.includes(id)) {
      setIsActiveAuthorId(isActiveAuthorId.filter((n) => n !== id));
    } else {
      setIsActiveAuthorId([...isActiveAuthorId, id]);
    }
  };

  const onSelectYears = (years: string, id: string) => {
    dispatch(setFilterYears(years));
    setIsActiveYearId([id]);
  };

  const onSelectGenres = (genre: string, id: string) => {
    dispatch(setFIlterGenres(genre));
    if (isActiveGenreId.includes(id)) {
      setIsActiveGenreId(isActiveGenreId.filter((n) => n !== id));
    } else {
      setIsActiveGenreId([...isActiveGenreId, id]);
    }
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        filterType={'author'}
        list={uniqAuthors}
        activeFilter={activeFilter}
        titleFilter="исполнителю"
        changeActiveFilter={changeActiveFilter}
        onSelect={onSelectAuthor}
        isActiveFilterId={isActiveAuthorId}
      />
      <FilterItem
        filterType={'year'}
        list={years}
        activeFilter={activeFilter}
        titleFilter="году выпуска"
        changeActiveFilter={changeActiveFilter}
        onSelect={onSelectYears}
        isActiveFilterId={isActiveYearId}
      />
      <FilterItem
        filterType={'genre'}
        list={uniqGenres}
        activeFilter={activeFilter}
        titleFilter="жанру"
        changeActiveFilter={changeActiveFilter}
        onSelect={onSelectGenres}
        isActiveFilterId={isActiveGenreId}
      />
    </div>
  );
}
