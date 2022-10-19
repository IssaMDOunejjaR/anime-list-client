import { request, gql } from "graphql-request";
import { endpoint } from "../constants";
import { Anime } from "../types";

export const getAnimesByPopularity = async (page: number): Promise<Anime[]> => {
	const {
		Page: { media },
	} = await request(
		endpoint,
		gql`
			query {
				Page(page: ${page}) {
					media(sort: POPULARITY_DESC, type: ANIME, format: TV) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						status
						description
						episodes
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

	return media;
};

export const getAnimesByTrending = async (page: number): Promise<Anime[]> => {
	const {
		Page: { media },
	} = await request(
		endpoint,
		gql`
			query {
				Page(page: ${page}) {
					media(sort: TRENDING_DESC, type: ANIME, format: TV) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						status
						description
						episodes
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

	return media;
};

export const getMoviesByTrending = async (page: number): Promise<Anime[]> => {
	const {
		Page: { media },
	} = await request(
		endpoint,
		gql`
			query {
				Page(page: ${page}) {
					media(sort: TRENDING_DESC, type: ANIME, format: MOVIE) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						status
						description
						episodes
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

	return media;
};
export const getMoviesByPopularity = async (page: number): Promise<Anime[]> => {
	const {
		Page: { media },
	} = await request(
		endpoint,
		gql`
			query {
				Page(page: ${page}) {
					media(sort: POPULARITY_DESC, type: ANIME, format: MOVIE) {
                        id
						title {
							romaji
						}
						coverImage {
							extraLarge
						}
						status
						description
						episodes
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

	return media;
};

export const getSearchedMedia = async (
	page: number,
	searchValue: string
): Promise<Anime[]> => {
	const {
		Page: { media },
	} = await request(
		endpoint,
		gql`
			query {
				Page(page: ${page}) {
					media(sort: TITLE_ROMAJI, type: ANIME, search: "${searchValue}") {
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

	return media;
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
