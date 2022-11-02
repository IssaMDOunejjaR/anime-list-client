export type Page = {
	pageInfo: {
		currentPage: number;
		hasNextPage: boolean;
	};
	media: Anime[];
};

export type Anime = {
	id: number;
	title: {
		romaji: string;
		english: string;
		native: string;
	};
	bannerImage: string;
	coverImage: {
		extraLarge: string;
	};
	format: string;
	status: string;
	duration: number;
	description: string;
	episodes: number;
	genres: string[];
	averageScore: number;
	season: string;
	source: string;
	countryOfOrigin: string;
	isAdult: boolean;
	startDate: {
		year: number | null;
		month: number | null;
		day: number | null;
	};
	endDate: {
		year: number | null;
		month: number | null;
		day: number | null;
	};
	tags: [
		{
			id: number;
			name: string;
			description: string;
		}
	];
	nextAiringEpisode: {
		timeUntilAiring: number;
		episode: number;
		airingAt: number;
	};
	recommendations: {
		nodes: [
			{
				mediaRecommendation: {
					id: number;
					title: {
						romaji: string;
					};
					description: string;
					coverImage: {
						extraLarge: string;
					};
					genres: string[];
				};
			}
		];
	};
	externalLinks: [
		{
			icon: string;
			url: string;
			color: string;
			site: string;
			language: string;
		}
	];
	relations: {
		nodes: [
			{
				id: number;
				type: string;
				title: {
					romaji: string;
				};
				coverImage: {
					extraLarge: string;
				};
				description: string;
				episodes: number;
				nextAiringEpisode: {
					episode: number;
				};
				genres: string[];
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
