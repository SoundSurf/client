import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecommendations } from "@/apis/driveApis/driveApis.ts";

export const useRecommendations = (genreId: number | "all") => {
  const { data: recommendations } = useSuspenseQuery({
    queryKey: ["recommendations", genreId],
    queryFn: () => getRecommendations(genreId),
  });

  return {
    recommendations,
  };
};
