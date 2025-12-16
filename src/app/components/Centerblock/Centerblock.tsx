import styles from './centerblock.module.css';
import Filter from '../Filter/Filter';
import Content from '../Content/Content';
import Track from '../Track/Track';

const data = [
  {
    title: 'Guilt',
    author: 'Nero',
    album: 'Welcome Relity',
    time: '4:44',
    span: '',
  },
  {
    title: 'Elektro',
    author: 'Dynoro, Outwork, Mr.Gee',
    album: 'Elektro',
    time: '2:22',
    span: '',
  },
  {
    title: "I'm Fire",
    author: 'Ali Bakgor',
    album: "I'm Fire",
    time: '2:22',
    span: '',
  },
  {
    title: 'Non Stop',
    author: 'Стоункат, Psychopath',
    album: 'Non Stop',
    time: '4:12',
    span: '(Remix)',
  },
  {
    title: 'Run Run',
    author: 'Jaded, Will Clarke, AR/CO',
    album: 'Run Run',
    time: '2:54',
    span: '(feat. AR/CO)',
  },
];

export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <div className={styles.centerblock__content}>
        <Content />
        <div className={styles.content__playlist}>
          {data.map((track, id) => {
            return (
              <Track
                key={id}
                title={track.title}
                author={track.author}
                album={track.album}
                time={track.time}
                span={track.span}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
