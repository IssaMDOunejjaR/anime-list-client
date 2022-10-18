export type Anime = {
	id: number;
	title: {
		romaji: string;
	};
	bannerImage: string;
	coverImage: {
		extraLarge: string;
	};
	format: string;
	status: string;
	description: string;
	episodes: number;
	genres: string[];
	averageScore: number;
	relations: {
		nodes: [
			{
				id: number;
				type: string;
			}
		];
	};
	characters: {
		nodes: [
			{
				name: {
					full: string;
					native: string;
				};
				image: {
					large: string;
				};
			}
		];
	};
	trailer: {
		thumbnail: string;
		site: string;
		id: string;
	};
	studios: {
		edges: [
			{
				node: {
					name: string;
				};
			}
		];
	};
	staff: {
		nodes: [
			{
				name: {
					full: string;
					native: string;
				};
				image: {
					large: string;
				};
				primaryOccupations: string[];
			}
		];
	};
};
