import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMoviesByTrending } from "../fetchers/media";

export const useMoviesByTrending = () => {
	return useInfiniteQuery(["trending-movies"], getMoviesByTrending, {
		getNextPageParam: (lastPage) => {
			if (lastPage.pageInfo.hasNextPage)
				return lastPage.pageInfo.currentPage + 1;
			else return undefined;
		},
	});
};
