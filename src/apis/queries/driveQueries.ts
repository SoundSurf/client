import { useState, useEffect } from "react";
import { useQuery, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  getRecommendations,
  getPrevTracks,
  getNextTracks,
  getAlbumInfo,
  getIsMusicSaved,
} from "@/apis/driveApis/driveApis.ts";
import { RecommendationRes } from "@/ssTypes/drive/driveTypes.ts";

export const useRecommendations = (genreId: string[]) => {
  const { data: initialRecommendations } = useQuery({
    queryKey: ["recommendations", genreId.join("")],
    queryFn: () => getRecommendations(genreId),
  });

  const [recommendations, setRecommendations] =
    useState<RecommendationRes | null>(null);

  useEffect(() => {
    if (initialRecommendations) {
      setRecommendations(initialRecommendations);
    }
  }, [initialRecommendations]);

  const prevTracksMutation = useMutation({
    mutationFn: () => getPrevTracks(genreId),
    onSuccess: (data) => {
      setRecommendations(data);
    },
  });

  const nextTracksMutation = useMutation({
    mutationFn: () => getNextTracks(genreId),
    onSuccess: (data) => {
      setRecommendations(data);
    },
  });

  return {
    recommendations,
    getPrevTracks: prevTracksMutation.mutate,
    getNextTracks: nextTracksMutation.mutate,
  };
};

export const useAlbumInfo = (albumId: string) => {
  const { data } = useQuery({
    queryKey: ["albumInfo", albumId],
    queryFn: () => getAlbumInfo(albumId),
  });

  return {
    data,
  };
};

export const useIsMusicSaved = (musicId: string) => {
  const { data } = useQuery({
    queryKey: ["isMusicSaved", musicId],
    queryFn: () => getIsMusicSaved(musicId),
  });

  return {
    data,
  };
};
