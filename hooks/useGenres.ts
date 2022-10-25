import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../fetchers/media";

export const useGenres = () => {
	return useQuery(["genres"], getGenres);
};
