export type User = {
	id: number;
	username: string;
	avatar: string;
	isFirstTime: boolean;
	animePreferences: UserPreferences;
	favorites: UserFavorites;
};

export type UserFavorites = { animeId: number; id: number }[];

export enum PreferenceStatus {
	NOTHING = "NOTHING",
	PLAN_TO_WATCH = "PLAN_TO_WATCH",
	WATCHING = "WATCHING",
	DROPPED = "DROPPED",
	FINISHED = "FINISHED",
}

export type UserPreferences = {
	animeId: number;
	status: PreferenceStatus;
	id: number;
	episode: number;
}[];
