import request, { gql } from "graphql-request";
import { backendEndpoint } from "../constants";

export const getLoggedUser = async () => {
	return await request(
		backendEndpoint,
		gql`
			query {
				LoggedUser {
					id
					username
				}
			}
		`
	);
};
