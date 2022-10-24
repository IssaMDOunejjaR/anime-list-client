import request, { gql } from "graphql-request";
import { backendEndpoint } from "../constants";
import { backendGql } from "../services/backendApi";
import { User } from "../types/user";

export const getLoggedUser = async (): Promise<User> => {
	const { LoggedUser } = await backendGql.request(
		gql`
			query {
				LoggedUser {
					id
					username
				}
			}
		`
	);

	console.log("LoggedUser:", LoggedUser);

	return LoggedUser;
};
