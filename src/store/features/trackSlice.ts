import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playList: TrackType[];
  shuffledPlayList: TrackType[];
  isShuffle: boolean;
  allTracks: TrackType[];
  favoriteTracks: TrackType[];
  fetchError: string;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playList: [],
  shuffledPlayList: [],
  isShuffle: false,
  allTracks: [],
  favoriteTracks: [],
  fetchError: '',
  fetchIsLoading: true,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlayList: (state, action: PayloadAction<TrackType[]>) => {
      state.playList = action.payload;
      state.shuffledPlayList = [...state.playList].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      const playList = state.isShuffle
        ? state.shuffledPlayList
        : state.playList;
      const currentIndex = playList.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (currentIndex !== playList.length - 1) {
        const nextTrackIndex = currentIndex + 1;
        state.currentTrack = playList[nextTrackIndex];
      } else {
        const nextTrackIndex = 0;
        state.currentTrack = playList[nextTrackIndex];
      }
    },
    setPrevTrack: (state) => {
      const playList = state.isShuffle
        ? state.shuffledPlayList
        : state.playList;
      if (state.currentTrack) {
        const currentIndex = playList.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        if (currentIndex !== 0) {
          const prevCurrentIndex = currentIndex - 1;
          state.currentTrack = playList[prevCurrentIndex];
        } else {
          state.currentTrack = playList[playList.length - 1];
        }
      }
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
      localStorage.setItem('favoriteTracks', JSON.stringify(state.favoriteTracks))
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter((track) => track._id !== action.payload._id);
      localStorage.setItem('favoriteTracks', JSON.stringify(state.favoriteTracks))
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentPlayList,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  addLikedTracks,
  setFavoriteTracks,
  removeLikedTracks,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
