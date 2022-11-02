import { useQuery } from "@tanstack/react-query";
import { getAnimesLatestEpisode } from "../fetchers/media";

export const useAnimesLatestEpisode = (perPage = 50) => {
	return useQuery(["lastest-episodes", perPage], () =>
		getAnimesLatestEpisode(perPage)
	);
};
