import { gql } from "graphql-request";
import { backendGql } from "../services/backendApi";
import { PreferenceStatus, User, UserFavorites } from "../types/user";

export const getLoggedUser = async (): Promise<User> => {
	const { LoggedUser } = await backendGql.request(
		gql`
			query {
				LoggedUser {
					id
					username
					avatar
					isFirstTime
					favorites {
						id
						animeId
					}
					animePreferences {
						id
						animeId
						status
						episode
					}
				}
			}
		`
	);

	return LoggedUser;
};

export const updateUser = async ({
	username,
	avatar,
	isFirstTime,
}: {
	username?: string;
	avatar: string;
	isFirstTime: boolean;
}) => {
	const { UpdateUser } = await backendGql.request(
		gql`
			mutation {
				UpdateUser(username: ${`"${username}"`}, avatar: ${`"${avatar}"`}, isFirstTime: ${isFirstTime}) {
					id
				}
			}
		`
	);

	return UpdateUser;
};

export const addMediaFavorite = async ({ animeId }: { animeId: number }) => {
	const { AddMediaFavorite } = await backendGql.request(
		gql`
			mutation {
				AddMediaFavorite(animeId: ${animeId}) {
					id
				}
			}
		`
	);

	return AddMediaFavorite;
};

export const addMediaPreference = async ({
	animeId,
	status,
	id,
	episode,
}: {
	animeId: number;
	status: PreferenceStatus;
	id: number;
	episode: number;
}) => {
	const { AddMediaPreference } = await backendGql.request(
		gql`
			mutation {
				AddMediaPreference(animeId: ${animeId}, status: ${`"${status}"`}, id: ${id}, episode: ${episode}) {
					id
				}
			}
		`
	);

	return AddMediaPreference;
};
