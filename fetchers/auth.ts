import { backendRest } from "../services/backendApi";

export const login = async (body: { username: string; password: string }) => {
	return await backendRest.post("login", body);
};

export const register = async (body: {
	username: string;
	email: string;
	password: string;
}) => {
	return await backendRest.post("register", body);
};
