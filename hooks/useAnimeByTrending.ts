import { useQuery } from "@tanstack/react-query";
import { getAnimesByTrending } from "../fetchers/media";

export const useAnimesByTrending = (page: number) => {
	return useQuery(["trending-animes"], () => getAnimesByTrending(page));
};
