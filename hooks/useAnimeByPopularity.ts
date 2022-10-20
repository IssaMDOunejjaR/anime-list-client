import { useInfiniteQuery } from "@tanstack/react-query";
import { getAnimesByPopularity } from "../fetchers/media";

export const useAnimesByPopularity = () => {
	return useInfiniteQuery(["popular-animes"], getAnimesByPopularity, {
		getNextPageParam: (lastPage) => {
			if (lastPage.pageInfo.hasNextPage)
				return lastPage.pageInfo.currentPage + 1;
			else return undefined;
		},
	});
};
