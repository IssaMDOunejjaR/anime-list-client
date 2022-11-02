import { useInfiniteQuery } from "@tanstack/react-query";
import { getMoviesByTrending } from "../fetchers/media";

export const useMoviesByTrending = (perPage = 50) => {
	return useInfiniteQuery(
		["trending-movies", perPage],
		({ pageParam }) => getMoviesByTrending({ pageParam, perPage }),
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.pageInfo.hasNextPage)
					return lastPage.pageInfo.currentPage + 1;
				else return undefined;
			},
		}
	);
};
