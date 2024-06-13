import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { debounce } from "lodash";
import {
  getRecommendations,
  getPrevTracks,
  getNextTracks,
  getAlbumInfo,
  getIsMusicSaved,
  getSavedMusics,
  postSaveMusic,
  deleteDeleteMusic,
  createPlayList,
  getPlaylist,
  patchCompletePlaylist,
  patchUnCompletePlaylist,
  getSearchData,
  postAddMusicToPlaylist,
  getEntirePlaylist,
} from "@/apis/driveApis/driveApis.ts";
import { postSignUp } from "@/apis/userApis/userApis.ts";
import ROUTES from "@/constants/routes.ts";
import {
  CreatePlayListReq,
  RecommendationRes,
} from "@/ssTypes/drive/driveTypes.ts";

import { SignInParam } from "@/ssTypes/sign/external/signExternalTypes.ts";

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

export const useCreatePlayList = (): {
  createPlayList: (body: CreatePlayListReq) => void;
} => {
  const navigate = useNavigate();

  const { data, mutate } = useMutation({
    mutationFn: (body: CreatePlayListReq) => createPlayList(body),
    onSuccess: (res) => {
      toast.success("플레이리스트를 생성했습니다.");
      if (res) {
        navigate(`${ROUTES.playList}/${res?.id}`);
      }
    },
    onError: () => {
      toast.error("에러가 발생했습니다");
    },
  });

  return {
    createPlayList: mutate,
  };
};

export const useGetPlayList = (id: string) => {
  const { data } = useQuery({
    queryKey: ["playList", id],
    queryFn: () => getPlaylist(id),
  });

  return {
    data,
  };
};

export const useCompletePlaylist = (
  id: string,
): {
  completePlaylist: () => void;
} => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => patchCompletePlaylist(id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["playList", id],
      });
      toast.success("상태가 변경되었습니다");
    },
    onError: () => {
      toast.error("에러가 발생했습니다");
    },
  });

  return {
    completePlaylist: mutate,
  };
};

export const useUnCompletePlaylist = (
  id: string,
): {
  unCompletePlaylist: () => void;
} => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => patchUnCompletePlaylist(id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["playList", id],
      });
      toast.success("상태가 변경되었습니다");
    },
    onError: () => {
      toast.error("에러가 발생했습니다");
    },
  });

  return {
    unCompletePlaylist: mutate,
  };
};

export const useSearchData = ({ id, title }: { id: string; title: string }) => {
  const [debouncedTitle, setDebouncedTitle] = useState(title);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedTitle(title);
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [title]);

  const { data } = useQuery({
    queryKey: ["searchData", id, debouncedTitle],
    queryFn: () => getSearchData(debouncedTitle),
    enabled: !!debouncedTitle,
  });

  return {
    data,
  };
};

interface AddMusicBody {
  trackId: string;
  imageUrl: string;
}

interface AddMusicParams {
  id: string;
  body: AddMusicBody;
}

export const useAddMusic = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, body }: AddMusicParams) =>
      postAddMusicToPlaylist({ id, body }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["playList", id],
      });
      toast.success("추가되었습니다");
    },
    onError: () => {
      toast.error("에러가 발생했습니다");
    },
  });

  return {
    addMusic: (params: AddMusicParams) => mutation.mutate(params),
  };
};

export const useGetEntirePlayList = () => {
  const { data } = useQuery({
    queryKey: ["entirePlayList"],
    queryFn: () => getEntirePlaylist(),
  });

  return {
    data,
  };
};
