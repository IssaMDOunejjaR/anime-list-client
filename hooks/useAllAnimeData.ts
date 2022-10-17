import { useQuery } from "@tanstack/react-query";
import { getAnimesByPopularity } from "../fetchers/media";

export const useAnimesByPopularity = (page: number) => {
	return useQuery(["popular-animes"], () => getAnimesByPopularity(page));
};
