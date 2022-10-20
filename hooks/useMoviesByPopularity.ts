import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMoviesByPopularity } from "../fetchers/media";

export const useMoviesByPopularity = () => {
	return useInfiniteQuery(["popular-movies"], getMoviesByPopularity, {
		getNextPageParam: (lastPage) => {
			if (lastPage.pageInfo.hasNextPage)
				return lastPage.pageInfo.currentPage + 1;
			else return undefined;
		},
	});
};
