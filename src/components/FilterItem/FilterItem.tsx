'use client';

import { data } from '@/data';
import styles from './filterItem.module.css';
import { getUniqueValuesByKey } from '@/utils/helper';
import classnames from 'classnames';
import { TrackType } from '@/sharedTypes/sharedTypes';

type FilterItemProp = {
  filterType: string;
  playList: TrackType[];
};
export default function FilterItem({ filterType, playList }: FilterItemProp) {

  let filterList: string[] = [];

  if (filterType === 'author') {
    filterList = getUniqueValuesByKey(playList, 'author');
  } if (filterType === 'year') {
    filterList = ['По умолчанию', 'Сначала новые', 'Сначала старые']
  } if (filterType === 'genre') {
    filterList = getUniqueValuesByKey(playList, 'genre');
  }

  return (
    <div
      className={classnames(styles.filter__modal, {
        [styles.active_author]: filterType === 'author',
      }, {
        [styles.active_year]: filterType === 'year',
      }, {
        [styles.active_genre]: filterType === 'genre',
      })}
    >
      <div className={styles.filter__list}>
        {filterList.map((el, id) => {
          return (
            <div key={id} className={styles.filter__el}>
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
}
