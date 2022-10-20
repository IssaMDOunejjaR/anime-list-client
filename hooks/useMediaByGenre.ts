import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMediaByGenre } from "../fetchers/media";

export const useMediaByGenre = (genre: string) => {
	return useInfiniteQuery(
		[`genre-${genre}`],
		({ pageParam = 1 }) => getMediaByGenre({ pageParam, genre }),
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.pageInfo.hasNextPage)
					return lastPage.pageInfo.currentPage + 1;
				else return undefined;
			},
		}
	);
};
