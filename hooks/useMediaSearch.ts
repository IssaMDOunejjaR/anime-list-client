import { useQuery } from "@tanstack/react-query";
import { getSearchedMedia } from "../fetchers/media";

export const useMediaSearch = (
	page: number,
	searchValue: string,
	startFetching: boolean
) => {
	return useQuery(
		[`search-${searchValue}`],
		() => getSearchedMedia(page, searchValue),
		{
			enabled: startFetching,
		}
	);
};
