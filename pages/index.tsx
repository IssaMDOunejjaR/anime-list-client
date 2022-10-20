import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Card from "../components/Card/Card";
import List from "../components/List/List";
import Loader from "../components/Loader/Loader";
import { useAnimesByPopularity } from "../hooks/useAnimeByPopularity";
import { useAnimesByTrending } from "../hooks/useAnimeByTrending";
import { useMoviesByPopularity } from "../hooks/useMoviesByPopularity";
import { useMoviesByTrending } from "../hooks/useMoviesByTrending";

const Home: NextPage = () => {
	const { data: popularAnime } = useAnimesByPopularity();
	const { data: trendingAnime } = useAnimesByTrending();
	const { data: popularMovies } = useMoviesByPopularity();
	const { data: trendingMovies } = useMoviesByTrending();

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<div className="w-full px-5 mb-16">
				<List title="Trending Now" url="/animes/trending">
					{trendingAnime ? (
						trendingAnime.pages.map((page, index) => (
							<Fragment key={index}>
								{page.media.slice(0, 20).map((anime) => (
									<Card key={anime.id} data={anime} />
								))}
							</Fragment>
						))
					) : (
						<Loader bgLight="bg-white" bgDark="bg-primary" />
					)}
				</List>
				<List title="Popular" url="/animes/popular">
					{popularAnime ? (
						popularAnime.pages.map((page, index) => (
							<Fragment key={index}>
								{page.media.slice(0, 20).map((anime) => (
									<Card key={anime.id} data={anime} />
								))}
							</Fragment>
						))
					) : (
						<Loader bgLight="bg-white" bgDark="bg-primary" />
					)}
				</List>
				<List title="Trending Movies" url="/animes/trending-movies">
					{trendingMovies ? (
						trendingMovies.pages.map((page, index) => (
							<Fragment key={index}>
								{page.media.slice(0, 20).map((anime) => (
									<Card key={anime.id} data={anime} />
								))}
							</Fragment>
						))
					) : (
						<Loader bgLight="bg-white" bgDark="bg-primary" />
					)}
				</List>
				<List title="Popular Movies" url="/animes/popular-movies">
					{popularMovies ? (
						popularMovies.pages.map((page, index) => (
							<Fragment key={index}>
								{page.media.slice(0, 20).map((anime) => (
									<Card key={anime.id} data={anime} />
								))}
							</Fragment>
						))
					) : (
						<Loader bgLight="bg-white" bgDark="bg-primary" />
					)}
				</List>
			</div>
		</>
	);
};

export default Home;
