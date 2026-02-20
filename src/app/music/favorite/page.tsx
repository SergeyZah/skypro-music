'use client'

import Centerblock from "@/components/Centerblock/Centerblock";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { resetFilters } from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";

export default function FavoritePage () {
    const { favoriteTracks, fetchIsLoading, fetchError, filters, filteredTracks } = useAppSelector((state) => state.tracks)
    const [playlist, setPlaylist] = useState<TrackType[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
    dispatch(resetFilters());
  }, []);

    useEffect(() => {
        const currentPlaylist = filters.authors.length || filters.genres.length || (filters.years !== 'По умолчанию') || filters.search.length ? filteredTracks : favoriteTracks;
        setPlaylist(currentPlaylist);
      }, [filteredTracks, favoriteTracks, filters]);

    return (
        <>
          <Centerblock
            playList={playlist}
            namePlaylist={'Мои треки'}
            isLoading={fetchIsLoading}
            error={fetchError || ''}
            pagePlaylist={favoriteTracks}
          />
        </>
      );
}