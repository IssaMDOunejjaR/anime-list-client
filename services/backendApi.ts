import { GraphQLClient } from "graphql-request";
import { backendEndpoint } from "../constants";

export const backendGql = new GraphQLClient(backendEndpoint, {
	credentials: "include",
	headers: {
		Authorization: `Bearer ${
			typeof window !== "undefined" && localStorage.getItem("token")
		}`,
	},
});
