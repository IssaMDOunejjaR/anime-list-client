import { useInfiniteQuery } from "@tanstack/react-query";
import { getCharacters } from "../fetchers/media";

export const useCharacters = () => {
	return useInfiniteQuery([`characters`], getCharacters, {
		getNextPageParam: (lastPage) => {
			if (lastPage.pageInfo.hasNextPage)
				return lastPage.pageInfo.currentPage + 1;
			else return undefined;
		},
	});
};
