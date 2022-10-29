import request, { gql } from "graphql-request";
import { backendEndpoint, endpoint } from "../constants";
import { backendRest } from "../services/backendApi";

// export const login = async (body: { username: string; password: string }) => {
// 	return await backendRest.post("login", body);
// };

// export const register = async (body: {
// 	username: string;
// 	email: string;
// 	password: string;
// }) => {
// 	return await backendRest.post("register", body);
// };

export const login = async ({
	username,
	password,
}: {
	username: string;
	password: string;
}) => {
	const { Login } = await request(
		backendEndpoint,
		gql`
			mutation {
				Login(username: ${`"${username}"`}, password: ${`"${password}"`}) {
					id
				}
			}
		`
	);

	return Login;
};

export const register = async ({
	username,
	email,
	password,
}: {
	username: string;
	email: string;
	password: string;
}) => {
	const { CreateUser } = await request(
		backendEndpoint,
		gql`
			mutation {
				CreateUser(username: ${`"${username}"`}, email: ${`"${email}"`},password: ${`"${password}"`}) {
					id
				}
			}
		`
	);

	return CreateUser;
};
