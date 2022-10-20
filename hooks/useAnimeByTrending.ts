import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAnimesByTrending } from "../fetchers/media";

export const useAnimesByTrending = () => {
	return useInfiniteQuery(["trending-animes"], getAnimesByTrending, {
		getNextPageParam: (lastPage) => {
			if (lastPage.pageInfo.hasNextPage)
				return lastPage.pageInfo.currentPage + 1;
			else return undefined;
		},
	});
};
