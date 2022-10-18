import { useQuery } from "@tanstack/react-query";
import { getMediaById } from "../fetchers/media";

export const useAnimeById = (id: number) => {
	return useQuery([`anime-${id}`], () => getMediaById(id), { enabled: !!id });
};
