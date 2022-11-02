import { useInfiniteQuery } from "@tanstack/react-query";
import { getAnimesByPopularity } from "../fetchers/media";

export const useAnimesByPopularity = (perPage = 50) => {
	return useInfiniteQuery(
		["popular-animes", perPage],
		({ pageParam }) => getAnimesByPopularity({ pageParam, perPage }),
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.pageInfo.hasNextPage)
					return lastPage.pageInfo.currentPage + 1;
				else return undefined;
			},
		}
	);
};
