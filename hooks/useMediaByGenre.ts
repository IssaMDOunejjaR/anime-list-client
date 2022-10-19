import { useQuery } from "@tanstack/react-query";
import { getMediaByGenre } from "../fetchers/media";

export const useMediaByGenre = (page: number, genre: string) => {
	return useQuery([`genre-${genre}`], () => getMediaByGenre(page, genre));
};
