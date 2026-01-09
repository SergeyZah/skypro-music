import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playList: TrackType[];
  shuffledPlayList: TrackType[];
  isShuffle: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playList: [],
  shuffledPlayList: [],
  isShuffle: false,
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
      const nextCurrentIndex = currentIndex + 1;
      state.currentTrack = playList[nextCurrentIndex];
    },
    setPrevTrack: (state) => {
      const playList = state.isShuffle
        ? state.shuffledPlayList
        : state.playList;
      if (state.currentTrack) {
        const currentIndex = playList.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const nextCurrentIndex = currentIndex - 1;
        state.currentTrack = playList[nextCurrentIndex];
      }
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
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
