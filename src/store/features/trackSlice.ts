import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playList: TrackType[];
  isShuffle: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playList: [],
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
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setNextTrack: (state) => {
      if (state.currentTrack) {
        const currentIndex = state.playList.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const nextCurrentIndex = currentIndex + 1;
        state.currentTrack = state.playList[nextCurrentIndex];
      }
    },
    setPrevTrack: (state) => {
      if (state.currentTrack) {
        const currentIndex = state.playList.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const nextCurrentIndex = currentIndex - 1;
        state.currentTrack = state.playList[nextCurrentIndex];
      }
    },
  },
});

export const { setCurrentTrack, setIsPlay, setCurrentPlayList, setNextTrack, setPrevTrack } =
  trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
