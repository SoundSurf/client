import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  useQuery,
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getRecommendations,
  getPrevTracks,
  getNextTracks,
  getAlbumInfo,
  getIsMusicSaved,
  getSavedMusics,
  postSaveMusic,
  deleteDeleteMusic,
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

export const useSavedMusics = () => {
  const { data } = useQuery({
    queryKey: ["savedMusics"],
    queryFn: () => getSavedMusics(),
  });

  return {
    data,
  };
};

export const useMusicSave = (): { saveMusic: (musicIds: string[]) => void } => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (musicIds: string[]) => postSaveMusic(musicIds),
    onSuccess: (data, variables) => {
      toast.success("플레이리스트에 저장했습니다");

      variables.forEach(async (musicId) => {
        await queryClient.refetchQueries({
          queryKey: ["isMusicSaved", musicId],
        });
      });
    },
    onError: () => {
      toast.error("에러가 발생했습니다");
    },
  });

  return {
    saveMusic: mutate,
  };
};

export const useMusicDelete = (): {
  deleteMusic: (musicId: string) => void;
} => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (musicId: string) => deleteDeleteMusic(musicId),
    onSuccess: (data, variables) => {
      toast.success("플레이리스트에서 삭제했습니다");
      console.log(variables, "vvvv");
      queryClient.refetchQueries({
        queryKey: ["savedMusics"],
      });
      queryClient.refetchQueries({
        queryKey: ["isMusicSaved", variables],
      });
    },
    onError: () => {
      toast.error("에러가 발생했습니다");
    },
  });

  return {
    deleteMusic: mutate,
  };
};
