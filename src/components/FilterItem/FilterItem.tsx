'use client';

import styles from './filterItem.module.css';
import classnames from 'classnames';

type FilterItemProp = {
  filterType: string;
  activeFilter: null | string;
  list: string[];
  titleFilter: string;
  changeActiveFilter: (n: string) => void;
  onSelect: (value: string, id: string) => void;
  isActiveFilterId: null | string[];
};
export default function FilterItem({
  filterType,
  list,
  activeFilter,
  titleFilter,
  changeActiveFilter,
  onSelect,
  isActiveFilterId
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
                  className={classnames(styles.filter__el, {
        [styles.el__active]: isActiveFilterId?.includes(String(id)),
      })}
                  onClick={() => onSelect(el, String(id))}
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
