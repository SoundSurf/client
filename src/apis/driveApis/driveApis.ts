import clientInstance from "@/apis/client.ts";
import { RecommendationRes } from "@/ssTypes/drive/driveTypes.ts";

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
