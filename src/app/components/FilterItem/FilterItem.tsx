'use client';

import { data } from '@/data';
import styles from './filterItem.module.css';
import { getUniqueValuesByKey } from '@/utils/helper';
import classnames from 'classnames';

type FilterItemProp = {
  filterType: string;
};
export default function FilterItem({ filterType }: FilterItemProp) {

  let filterList: string[] = [];

  console.log(filterType)

  if (filterType === 'author') {
    filterList = getUniqueValuesByKey(data, 'author');
  } if (filterType === 'year') {
    filterList = ['По умолчанию', 'Сначала новые', 'Сначала старые']
  } if (filterType === 'genre') {
    filterList = getUniqueValuesByKey(data, 'genre');
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
