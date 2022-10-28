import { useInfiniteQuery } from "@tanstack/react-query";
import { getMediaByTag } from "../fetchers/media";

export const useMediaByTag = (tag: string) => {
	return useInfiniteQuery(
		[`tag-${tag}`],
		({ pageParam = 1 }) => getMediaByTag({ pageParam, tag }),
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.pageInfo.hasNextPage)
					return lastPage.pageInfo.currentPage + 1;
				else return undefined;
			},
		}
	);
};
