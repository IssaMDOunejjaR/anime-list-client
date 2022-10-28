import { useQuery } from "@tanstack/react-query";
import { getTags } from "../fetchers/media";

export const useTags = () => {
	return useQuery(["tags"], getTags);
};
