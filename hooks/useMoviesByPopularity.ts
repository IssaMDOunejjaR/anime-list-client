import { useInfiniteQuery } from "@tanstack/react-query";
import { getMoviesByPopularity } from "../fetchers/media";

export const useMoviesByPopularity = (perPage = 50) => {
	return useInfiniteQuery(
		["popular-movies", perPage],
		({ pageParam }) => getMoviesByPopularity({ pageParam, perPage }),
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.pageInfo.hasNextPage)
					return lastPage.pageInfo.currentPage + 1;
				else return undefined;
			},
		}
	);
};
