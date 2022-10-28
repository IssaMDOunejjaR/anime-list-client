import { useQuery } from "@tanstack/react-query";
import { getLoggedUser } from "../fetchers/user";

export const useLoggedUser = () => {
	return useQuery(["logged-user"], getLoggedUser);
};
