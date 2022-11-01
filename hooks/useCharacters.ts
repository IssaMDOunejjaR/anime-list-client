import { useInfiniteQuery } from "@tanstack/react-query";
import { getCharacters } from "../fetchers/media";

export const useCharacters = (searchValue: string) => {
	return useInfiniteQuery(
		[`characters-${searchValue}`],
		({ pageParam }) => getCharacters({ pageParam, searchValue }),
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.pageInfo.hasNextPage)
					return lastPage.pageInfo.currentPage + 1;
				else return undefined;
			},
		}
	);
};
