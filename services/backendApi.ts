import { GraphQLClient } from "graphql-request";
import { backendEndpoint } from "../constants";
import axios from "axios";

export const backendGql = new GraphQLClient(backendEndpoint, {
	credentials: "include",
});

export const backendRest = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEN_ENDPOINT,
	withCredentials: true,
});
