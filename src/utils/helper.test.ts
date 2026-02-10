import { formatTime } from './helper';

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
});
