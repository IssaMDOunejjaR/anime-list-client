import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAnimesByTrending } from "../fetchers/media";

export const useAnimesByTrending = (perPage = 50) => {
	return useInfiniteQuery(
		["trending-animes", perPage],
		({ pageParam }) => getAnimesByTrending({ pageParam, perPage }),
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.pageInfo.hasNextPage)
					return lastPage.pageInfo.currentPage + 1;
				else return undefined;
			},
		}
	);
};
