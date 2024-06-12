import clientInstance from "@/apis/client.ts";
import { AlbumInfoResponse, RecommendationRes } from "@/ssTypes/drive/driveTypes.ts";

export const getRecommendations = async (
  genreId: number | "all",
): Promise<RecommendationRes> => {
  let url = "";

  if (genreId === "all") {
    url = `/spotify/recommendation?genres`;
  } else {
    url = `/spotify/recommendation?genres=${genreId}`;
  }

  const { data } = await clientInstance.get(url);
  return data;
};

export const getPrevTracks = async (
  genreId: number | "all",
): Promise<RecommendationRes> => {
  let url = "";
  if (genreId === "all") {
    url = `/track/previous?genres`;
  } else {
    url = `/track/previous??genres=${genreId}`;
  }
  const { data } = await clientInstance.get(url);
  return data;
};

export const getNextTracks = async (
  genreId: number | "all",
): Promise<RecommendationRes> => {
  let url = "";
  if (genreId === "all") {
    url = `/track/following?genres`;
  } else {
    url = `/track/following?genres=${genreId}`;
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
