export type Anime = {
	id: number;
	title: {
		romaji: string;
	};
	coverImage: {
		extraLarge: string;
	};
	status: string;
	description: string;
	episodes: number;
	genres: string[];
	averageScore: number;
	studios: {
		edges: [
			{
				node: {
					name: string;
				};
			}
		];
	};
};
