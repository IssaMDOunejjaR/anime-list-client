import { useInfiniteQuery } from '@tanstack/react-query';
import { getAdvancedSearchedMedia } from '../fetchers/media';
import { SearchOptions } from '../pages/search';

export const useAdvancedSearchedMedia = (
	searchValue: string,
	searchOptions: SearchOptions
) => {
	return useInfiniteQuery(
		[
			'search',
			searchValue,
			searchOptions.format,
			searchOptions.season,
			searchOptions.year,
			searchOptions.genres,
			searchOptions.tags,
			searchOptions.sort,
		],
		({ pageParam = 1 }) =>
			getAdvancedSearchedMedia({ pageParam, searchValue, searchOptions }),
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.pageInfo.hasNextPage)
					return lastPage.pageInfo.currentPage + 1;
				else return undefined;
			},
		}
	);
};
