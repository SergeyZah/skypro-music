'use client';

import styles from './filterItem.module.css';
import classnames from 'classnames';

type FilterItemProp = {
  filterType: string;
  activeFilter: null | string;
  list: string[];
  titleFilter: string;
  changeActiveFilter: (n: string) => void;
  onSelect: (value: string) => void;
};
export default function FilterItem({
  filterType,
  list,
  activeFilter,
  titleFilter,
  changeActiveFilter,
  onSelect,
}: FilterItemProp) {
  return (
    <div
      className={classnames(styles.filter__button, {
        [styles.active_author]: activeFilter === filterType,
      })}
      onClick={() => changeActiveFilter(filterType)}
    >
      {titleFilter}
      {activeFilter === filterType && (
        <div className={styles.filter__wrapper}>
          <div className={styles.filter__list}>
            {list.map((el, id) => {
              return (
                <div
                  key={id}
                  className={styles.filter__el}
                  onClick={() => onSelect(el)}
                >
                  {el}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
