import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getSearchedMedia } from "../fetchers/media";

export const useMediaSearch = (
	page: number,
	searchValue: string,
	startFetching: boolean
) => {
	return useInfiniteQuery(
		[`search-${searchValue}`],
		({ pageParam = 1 }) => getSearchedMedia({ pageParam, searchValue }),
		{
			enabled: startFetching,
			getNextPageParam: (lastPage) => {
				if (lastPage.pageInfo.hasNextPage)
					return lastPage.pageInfo.currentPage + 1;
				else return undefined;
			},
		}
	);
};
