import clientInstance from "@/apis/client.ts";
import {
  AlbumInfoResponse,
  IsMusicSavedRes,
  RecommendationRes,
  SavedMusicsRes,
} from "@/ssTypes/drive/driveTypes.ts";
import {
  SignInParam,
  SignUpRes,
} from "@/ssTypes/sign/external/signExternalTypes.ts";

export const getRecommendations = async (
  genreId: string[],
): Promise<RecommendationRes> => {
  let url = "";

  if (genreId[0] === "all") {
    url = `/spotify/recommendation?genres`;
  } else {
    const genreParam = genreId.reduce(
      (acc, curr) => (acc ? `${acc},${curr}` : curr),
      "",
    );
    url = `/spotify/recommendation?genres=${genreParam}`;
  }

  const { data } = await clientInstance.get(url);
  return data;
};

export const getPrevTracks = async (
  genreId: string[],
): Promise<RecommendationRes> => {
  let url = "";

  if (genreId[0] === "all") {
    url = `/track/previous?genres`;
  } else {
    const genreParam = genreId.reduce(
      (acc, curr) => (acc ? `${acc},${curr}` : curr),
      "",
    );
    url = `/track/previous?genres=${genreParam}`;
  }

  const { data } = await clientInstance.get(url);
  return data;
};

export const getNextTracks = async (
  genreId: string[],
): Promise<RecommendationRes> => {
  let url = "";

  if (genreId[0] === "all") {
    url = `/track/following?genres`;
  } else {
    const genreParam = genreId.reduce(
      (acc, curr) => (acc ? `${acc},${curr}` : curr),
      "",
    );
    url = `/track/following?genres=${genreParam}`;
  }

  const { data } = await clientInstance.get(url);
  return data;
};

export const getAlbumInfo = async (
  albumId: string,
): Promise<AlbumInfoResponse> => {
  const { data } = await clientInstance.get("/spotify/album-info", {
    params: {
      albumId: albumId,
    },
  });
  return data;
};

export const getIsMusicSaved = async (
  musicId: string,
): Promise<IsMusicSavedRes> => {
  const { data } = await clientInstance.get("/profile/music/is-saved", {
    params: {
      musicId: musicId,
    },
  });
  return data;
};

export const getSavedMusics = async (): Promise<SavedMusicsRes> => {
  const { data } = await clientInstance.get("/profile/list/saved-musics");
  return data;
};

export const postSaveMusic = async (
  musicIds: string[],
): Promise<SavedMusicsRes> => {
  const queryString = musicIds
    .map((id) => `musicIds=${encodeURIComponent(id)}`)
    .join("&");

  const { data } = await clientInstance.post(
    `/profile/music/save?${queryString}`,
  );

  return data;
};

export const deleteDeleteMusic = async (
  musicId: string,
): Promise<SavedMusicsRes> => {
  const { data } = await clientInstance.delete(`/profile/music/unsave`, {
    params: {
      musicId: musicId,
    },
  });

  return data;
};
