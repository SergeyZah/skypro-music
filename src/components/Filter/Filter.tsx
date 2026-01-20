'use client';

import { useState } from 'react';
import FilterItem from '../FilterItem/FilterItem';
import styles from './filter.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';

type FilterTypeProp = {
  playList: TrackType[];
};

export default function Filter({playList}: FilterTypeProp) {
  const [isFilterVisible, setIsFilterVisible] = useState('');

  const filteringAuthors = () => {
    if (isFilterVisible !== 'author') {
      setIsFilterVisible('author');
    } else {
      setIsFilterVisible('');
    }
  };

  const filteringYears = () => {
    if (isFilterVisible !== 'year') {
      setIsFilterVisible('year');
    } else {
      setIsFilterVisible('');
    }
  };

  const filteringGenre = () => {
    if (isFilterVisible !== 'genre') {
      setIsFilterVisible('genre');
    } else {
      setIsFilterVisible('');
    }
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div onClick={filteringAuthors} className={styles.filter__button}>
        исполнителю
      </div>
      <div onClick={filteringYears} className={styles.filter__button}>году выпуска</div>
      <div onClick={filteringGenre} className={styles.filter__button}>жанру</div>
      <FilterItem filterType={isFilterVisible} playList={playList}/>
    </div>
  );
}
