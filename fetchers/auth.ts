import request, { gql } from "graphql-request";
import { backendEndpoint, endpoint } from "../constants";

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
					access_token
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
