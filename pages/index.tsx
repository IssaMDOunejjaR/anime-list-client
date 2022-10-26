import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Card, { CardSkeleton } from "../components/Card/Card";
import List from "../components/List/List";
import Main from "../components/Main/Main";
import { useAnimesByPopularity } from "../hooks/useAnimeByPopularity";
import { useAnimesByTrending } from "../hooks/useAnimeByTrending";
import { useAnimesLatestEpisode } from "../hooks/useAnimesLatestEpisode";
import { useMoviesByPopularity } from "../hooks/useMoviesByPopularity";
import { useMoviesByTrending } from "../hooks/useMoviesByTrending";
import { Anime } from "../types";

const Home: NextPage = () => {
	const { data: latestEpisodes } = useAnimesLatestEpisode();
	const { data: popularAnime } = useAnimesByPopularity();
	const { data: trendingAnime } = useAnimesByTrending();
	const { data: popularMovies } = useMoviesByPopularity();
	const { data: trendingMovies } = useMoviesByTrending();

	const placeholder = [...new Array(20)].map((_, index) => (
		<CardSkeleton key={index} />
	));

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<div>
				<Main />
			</div>
			<div className="w-full px-5 mb-16">
				<List title="Latest Episodes" url="/animes/latest-episodes">
					{latestEpisodes
						? latestEpisodes
								.filter(
									({ media }: { media: Anime }) =>
										media.isAdult === false
								)
								.slice(0, 20)
								.map(
									({
										episode,
										media,
									}: {
										episode: number;
										media: Anime;
									}) => (
										<Card
											key={media.id + episode}
											data={media}
										/>
									)
								)
						: placeholder}
				</List>
				<List title="Trending Now" url="/animes/trending">
					{trendingAnime
						? trendingAnime.pages.map((page, index) => (
								<Fragment key={index}>
									{page.media.slice(0, 20).map((anime) => (
										<Card key={anime.id} data={anime} />
									))}
								</Fragment>
						  ))
						: placeholder}
				</List>
				<List title="Popular" url="/animes/popular">
					{popularAnime
						? popularAnime.pages.map((page, index) => (
								<Fragment key={index}>
									{page.media.slice(0, 20).map((anime) => (
										<Card key={anime.id} data={anime} />
									))}
								</Fragment>
						  ))
						: placeholder}
				</List>
				<List title="Trending Movies" url="/animes/trending-movies">
					{trendingMovies
						? trendingMovies.pages.map((page, index) => (
								<Fragment key={index}>
									{page.media.slice(0, 20).map((anime) => (
										<Card key={anime.id} data={anime} />
									))}
								</Fragment>
						  ))
						: placeholder}
				</List>
				<List title="Popular Movies" url="/animes/popular-movies">
					{popularMovies
						? popularMovies.pages.map((page, index) => (
								<Fragment key={index}>
									{page.media.slice(0, 20).map((anime) => (
										<Card key={anime.id} data={anime} />
									))}
								</Fragment>
						  ))
						: placeholder}
				</List>
			</div>
		</>
	);
};

export default Home;
