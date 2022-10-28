import { useQuery } from "@tanstack/react-query";
import { getAnimesLatestEpisode } from "../fetchers/media";

export const useAnimesLatestEpisode = () => {
	return useQuery(["lastest-episodes"], getAnimesLatestEpisode);
};
