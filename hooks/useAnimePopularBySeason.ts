import { useQuery } from "@tanstack/react-query";
import { getAnimePopularBySeason } from "../fetchers/media";

export const useAnimePopularBySeason = ({
	season,
	seasonYear,
}: {
	season: string;
	seasonYear: number;
}) => {
	return useQuery(["season", season, seasonYear], () =>
		getAnimePopularBySeason({ season, seasonYear })
	);
};
