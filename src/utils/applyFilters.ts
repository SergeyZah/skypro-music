import { TrackType } from '@/sharedTypes/sharedTypes';
import { initialStateType } from '@/store/features/trackSlice';

export const applyFilters = (state: initialStateType): TrackType[] => {
  let filteredPlayList = state.pagePlaylist;

  if (state.filters.authors.length) {
    filteredPlayList = filteredPlayList.filter((track) => {
      return state.filters.authors.includes(track.author);
    });
  }
  if (state.filters.genres.length) {
    filteredPlayList = filteredPlayList.filter((track) => {
      return state.filters.genres.some((el) => track.genre.includes(el));
    });
  }

  return filteredPlayList;
};
