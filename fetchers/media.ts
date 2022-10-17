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
