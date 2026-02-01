'use client'

import Centerblock from "@/components/Centerblock/Centerblock";
import { useAppSelector } from "@/store/store";

export default function FavoritePage () {
    const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector((state) => state.tracks)
    return (
        <>
          <Centerblock
            playList={favoriteTracks}
            namePlaylist={'Мои треки'}
            isLoading={fetchIsLoading}
            error={fetchError || ''}
          />
        </>
      );
}