import { data } from '@/data';
import {
  formatTime,
  getTimePanel,
  getUniqueValuesByKey,
  searchNameTracks,
} from './helper';

describe('formatTime', () => {
  it('Добавление нуля, если секунд < 10', () => {
    expect(formatTime(62)).toBe('1:02');
  });
  it('Форматирует время < 1 минуты', () => {
    expect(formatTime(27)).toBe('0:27');
  });
  it('Обрабатывает 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
  it('Обрабатывает 60 минут', () => {
    expect(formatTime(3600)).toBe('60:00');
  });
  it('Обрабатывает > 60 минут', () => {
    expect(formatTime(5827)).toBe('97:07');
  });
});

describe('getTimePanel', () => {
  it('Обрабатывает нулевое время трека', () => {
    expect(getTimePanel(0, 0)).toBe('0:00 / 0:00');
  });
  it('Обрабатывает нулевое текущее время трека', () => {
    expect(getTimePanel(0, 90)).toBe('0:00 / 1:30');
  });
  it('Обрабатывает окончание трека', () => {
    expect(getTimePanel(87, 87)).toBe('1:27 / 1:27');
  });
  it('Обрабатывает текущее время трека', () => {
    expect(getTimePanel(38, 85)).toBe('0:38 / 1:25');
  });
  it('Обрабатывает большие значения', () => {
    expect(getTimePanel(4482, 7528)).toBe('74:42 / 125:28');
  });
});

describe('getUniqueValuesByKey', () => {
  it('Возвращает массив уникальных авторов', () => {
    expect(getUniqueValuesByKey(data, 'author')).toStrictEqual([
      'Alexander Nakarada',
      'Frank Schroter',
      'Kevin Macleod',
      'Mixkit',
      '-',
      'Waltz Piano',
      'Winniethemoog',
    ]);
  });
  it('Возвращает массив уникальных жанров', () => {
    expect(getUniqueValuesByKey(data, 'genre')).toStrictEqual([
      'Классическая музыка',
    ]);
  });
});

describe('searchNameTracks', () => {
  it('Находит треки по введённому значению в соответствии с регистром', () => {
    expect(searchNameTracks('Ma', data)).toEqual([
      {
        _id: 14,
        name: 'The March OF The Final Battle',
        author: '-',
        release_date: '2011-11-02',
        genre: ['Классическая музыка'],
        duration_in_seconds: 206,
        album: 'The March OF The Final Battle',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/musiclfiles_-_The_March_Of_The_Final_Battle.mp3',
        stared_user: [],
      },
      {
        _id: 17,
        name: 'Cinematic',
        author: 'Winniethemoog',
        release_date: '2004-10-01',
        genre: ['Классическая музыка'],
        duration_in_seconds: 206,
        album: 'Cinematic',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog_-_Action_Sport_Breakbeat.mp3',
        stared_user: [],
      },
    ]);
  });

  it('Находит треки по введённому значению без учёта регистра: маленькие буквы', () => {
    expect(searchNameTracks('ma', data)).toEqual([
      {
        _id: 14,
        name: 'The March OF The Final Battle',
        author: '-',
        release_date: '2011-11-02',
        genre: ['Классическая музыка'],
        duration_in_seconds: 206,
        album: 'The March OF The Final Battle',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/musiclfiles_-_The_March_Of_The_Final_Battle.mp3',
        stared_user: [],
      },
      {
        _id: 17,
        name: 'Cinematic',
        author: 'Winniethemoog',
        release_date: '2004-10-01',
        genre: ['Классическая музыка'],
        duration_in_seconds: 206,
        album: 'Cinematic',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog_-_Action_Sport_Breakbeat.mp3',
        stared_user: [],
      },
    ]);
  });

  it('Находит треки по введённому значению без учёта регистра: большие буквы', () => {
    expect(searchNameTracks('MA', data)).toEqual([
      {
        _id: 14,
        name: 'The March OF The Final Battle',
        author: '-',
        release_date: '2011-11-02',
        genre: ['Классическая музыка'],
        duration_in_seconds: 206,
        album: 'The March OF The Final Battle',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/musiclfiles_-_The_March_Of_The_Final_Battle.mp3',
        stared_user: [],
      },
      {
        _id: 17,
        name: 'Cinematic',
        author: 'Winniethemoog',
        release_date: '2004-10-01',
        genre: ['Классическая музыка'],
        duration_in_seconds: 206,
        album: 'Cinematic',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog_-_Action_Sport_Breakbeat.mp3',
        stared_user: [],
      },
    ]);
  });

  it('Находит треки по цифрам', () => {
    expect(searchNameTracks('4', data)).toEqual([
      {
        _id: 7,
        name: 'Song № 4',
        author: 'Alexander Nakarada',
        release_date: '2005-06-11',
        genre: ['Классическая музыка'],
        duration_in_seconds: 128,
        album: 'Chase',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3',
        stared_user: [],
      },
    ]);
  });
});
