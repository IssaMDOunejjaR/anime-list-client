import { request, gql } from 'graphql-request';
import { endpoint } from '../constants';
import { SearchOptions } from '../pages/search';
import { Anime, Page } from '../types';

export const getCharacters = async ({
	pageParam = 1,
	searchValue,
}: {
	pageParam: number;
	searchValue: string;
}): Promise<{
	pageInfo: {
		currentPage: number;
		hasNextPage: boolean;
	};
	characters: {
		name: {
			full: string;
		};
		image: {
			large: string;
		};
	}[];
}> => {
	const { Page } = await request(
		endpoint,
		gql`
			query {
				Page(page: ${pageParam}) {
					pageInfo {
						currentPage
						hasNextPage
					}
					characters(search: ${searchValue ? `"${searchValue}"` : null}) {
						name {
							full
						}
						image {
							large
						}
					}
				}
			}
		`
	);

	return Page;
};

export const getGenres = async (): Promise<string[]> => {
	const { GenreCollection } = await request(
		endpoint,
		gql`
			query {
				GenreCollection
			}
		`
	);

	return GenreCollection;
};

export const getTags = async (): Promise<
	{ name: string; isAdult: boolean }[]
> => {
	const { MediaTagCollection } = await request(
		endpoint,
		gql`
			query {
				MediaTagCollection {
					name
					isAdult
				}
			}
		`
	);

	return MediaTagCollection;
};

export const getAnimePopularBySeason = async ({
	season,
	seasonYear,
}: {
	season: string;
	seasonYear: number;
}): Promise<Page> => {
	const { Page } = await request(
		endpoint,
		gql`
			query {
				Page(page: 1, perPage: 7) {
					media(
						type: ANIME
						season: ${`${season}`}
						seasonYear: ${`${seasonYear}`}
						status: RELEASING
						isAdult: false
						sort: POPULARITY_DESC
					) {
						id
						title {
							romaji
						}
						bannerImage
						description
					}
				}
			}
		`
	);

	return Page;
};

export const getAnimesLatestEpisode = async (): Promise<any> => {
	const now = Math.round(Date.now() / 1000);

	const {
		Page: { airingSchedules },
	} = await request(
		endpoint,
		gql`
			query {
				Page(page: 1) {
					airingSchedules(
						airingAt_lesser: ${now},
						sort: TIME_DESC
					) {
						episode
						media {
							id
							title {
								romaji
							}
							coverImage {
								extraLarge
							}
							format
							status
							description
							episodes
							countryOfOrigin
							isAdult
							nextAiringEpisode {
								episode
							}
							genres
							averageScore
							studios {
								edges {
									node {
										name
									}
								}
							}
						}
					}
				}
			}
		`
	);

	return airingSchedules;
};

export const getAnimesByPopularity = async ({
	pageParam = 1,
}): Promise<Page> => {
	const { Page } = await request(
		endpoint,
		gql`
			query {
				Page(page: ${pageParam}) {
					pageInfo {
						currentPage
						hasNextPage
					}
					media(sort: POPULARITY_DESC, type: ANIME, format: TV, isAdult: false) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						format
						status
						description
						episodes
						nextAiringEpisode {
							episode
						}
						genres
						averageScore
                        studios {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
					}
				}
			}
		`
	);

	return Page;
};

export const getAnimesByTrending = async ({ pageParam = 1 }): Promise<Page> => {
	const { Page } = await request(
		endpoint,
		gql`
			query {
				Page(page: ${pageParam}) {
					pageInfo {
						currentPage
						hasNextPage
					}
					media(sort: TRENDING_DESC, type: ANIME, format: TV, isAdult: false) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						format
						status
						description
						episodes
						nextAiringEpisode {
							episode
						}
						genres
						averageScore
                        studios {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
					}
				}
			}
		`
	);

	return Page;
};

export const getMoviesByTrending = async ({ pageParam = 1 }): Promise<Page> => {
	const { Page } = await request(
		endpoint,
		gql`
			query {
				Page(page: ${pageParam}) {
					pageInfo {
						currentPage
						hasNextPage
					}
					media(sort: TRENDING_DESC, type: ANIME, format: MOVIE, isAdult: false) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						format
						status
						description
						episodes
						nextAiringEpisode {
							episode
						}
						genres
						averageScore
                        studios {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
					}
				}
			}
		`
	);

	return Page;
};

export const getMoviesByPopularity = async ({
	pageParam = 1,
}): Promise<Page> => {
	const { Page } = await request(
		endpoint,
		gql`
			query {
				Page(page: ${pageParam}) {
					pageInfo {
						currentPage
						hasNextPage
					}
					media(sort: POPULARITY_DESC, type: ANIME, format: MOVIE, isAdult: false) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						format
						status
						description
						episodes
						nextAiringEpisode {
							episode
						}
						genres
						averageScore
                        studios {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
					}
				}
			}
		`
	);

	return Page;
};

export const getMediaByTag = async ({
	pageParam = 1,
	tag,
}: {
	pageParam: number;
	tag: string;
}): Promise<Page> => {
	const { Page } = await request(
		endpoint,
		gql`
			query {
				Page(page: ${pageParam}) {
					pageInfo {
						currentPage
						hasNextPage
					}
					media(tag: "${tag}", sort: POPULARITY_DESC, isAdult: false) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						format
						status
						description
						episodes
						nextAiringEpisode {
							episode
						}
						genres
						averageScore
                        studios {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
					}
				}
			}
		`
	);

	return Page;
};

export const getMediaByGenre = async ({
	pageParam = 1,
	genre,
}: {
	pageParam: number;
	genre: string;
}): Promise<Page> => {
	const { Page } = await request(
		endpoint,
		gql`
			query {
				Page(page: ${pageParam}) {
					pageInfo {
						currentPage
						hasNextPage
					}
					media(genre: "${genre}", sort: POPULARITY_DESC, isAdult: false) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						format
						status
						description
						episodes
						nextAiringEpisode {
							episode
						}
						genres
						averageScore
                        studios {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
					}
				}
			}
		`
	);

	return Page;
};

export const getSearchedMedia = async ({
	pageParam = 1,
	searchValue,
}: {
	pageParam: number;
	searchValue: string;
}): Promise<Page> => {
	const { Page } = await request(
		endpoint,
		gql`
			query {
				Page(page: ${pageParam}) {
					pageInfo {
						currentPage
						hasNextPage
					}
					media(sort: TITLE_ROMAJI, type: ANIME, search: "${searchValue}", isAdult: false) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						format
						status
						description
						episodes
						nextAiringEpisode {
							episode
						}
						genres
						averageScore
                        studios {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
					}
				}
			}
		`
	);

	return Page;
};

export const getAdvancedSearchedMedia = async ({
	pageParam = 1,
	searchValue,
	searchOptions,
}: {
	pageParam: number;
	searchValue: string;
	searchOptions: SearchOptions;
}): Promise<Page> => {
	const { Page } = await request(
		endpoint,
		gql`
			query {
				Page(page: ${pageParam}) {
					pageInfo {
						currentPage
						hasNextPage
					}
					media(sort: ${searchOptions.sort}, type: ANIME, search: ${
			searchValue ? `"${searchValue}"` : null
		}, genre_in: ${
			searchOptions.genres.length
				? JSON.stringify(searchOptions.genres)
				: null
		}, tag_in: ${
			searchOptions.tags.length
				? JSON.stringify(searchOptions.tags)
				: null
		}, seasonYear: ${searchOptions.year}, ${
			searchOptions.season ? `season: ${searchOptions.season},` : ''
		} ${
			searchOptions.format ? `format: ${searchOptions.format},` : ''
		} isAdult: false) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						format
						status
						description
						episodes
						nextAiringEpisode {
							episode
						}
						genres
						averageScore
                        studios {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
					}
				}
			}
		`
	);

	return Page;
};

export const getMediaById = async (id: number): Promise<Anime> => {
	const { Media } = await request(
		endpoint,
		gql`
			query {
				Media(id: ${id}) {
					id
					title {
						romaji
						english
        				native
					}
					coverImage {
						extraLarge
					}
					trailer {
						thumbnail
						site
						id
					}
					format
					status
					duration
					description
					episodes
					genres
					season
					averageScore
					bannerImage
					source
					genres
					startDate {
						year
						month
						day
					}
					endDate {
						year
						month
						day
					}
					tags {
						id
						name
						description
					}
					nextAiringEpisode {
						timeUntilAiring
						episode
						airingAt
					}
					recommendations {
						nodes {
							mediaRecommendation {
								id
								title {
									romaji
								}
								description
								coverImage {
									extraLarge
								}
								genres
							}
						}
					}
					externalLinks {
						icon
						url
						color
						site
						language
					}
					relations {
						nodes {
							id
							type
						}
					}
					characters(sort: ROLE) {
						nodes {
							name {
								full
								native
							}
							image {
								large
							}
						}
					}
					studios {
						edges {
							node {
								name
							}
						}
					}
					staff(sort: LANGUAGE) {
						nodes {
							name {
								full
								native
							}
							image {
								large
							}
							primaryOccupations
						}
					}
				}
			}
		`
	);

	return Media;
};
