import { useQuery } from "@tanstack/react-query";
import { getMoviesByPopularity } from "../fetchers/media";

export const useMoviesByPopularity = (page: number) => {
	return useQuery(["popular-movies"], () => getMoviesByPopularity(page));
};
