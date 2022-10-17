import { useQuery } from "@tanstack/react-query";
import { getMoviesByTrending } from "../fetchers/media";

export const useMoviesByTrending = (page: number) => {
	return useQuery(["trending-movies"], () => getMoviesByTrending(page));
};
