import type { NextPage } from "next";
import Head from "next/head";
import Card from "../components/Card/Card";
import List from "../components/List/List";
import Loader from "../components/Loader/Loader";
import { useAnimesByPopularity } from "../hooks/useAllAnimeData";
import { useAnimesByTrending } from "../hooks/useAnimeByTrending";
import { useMoviesByPopularity } from "../hooks/useMoviesByPopularity";
import { useMoviesByTrending } from "../hooks/useMoviesByTrending";

const Home: NextPage = () => {
	const { data: popularAnime } = useAnimesByPopularity(1);
	const { data: trendingAnime } = useAnimesByTrending(1);
	const { data: popularMovies } = useMoviesByPopularity(1);
	const { data: trendingMovies } = useMoviesByTrending(1);

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<div className="w-full px-5">
				<List title="Trending Now" url="/animes/trending">
					{trendingAnime ? (
						trendingAnime
							.slice(0, 20)
							.map((anime) => (
								<Card key={anime.id} data={anime} />
							))
					) : (
						<Loader bgLight="bg-white" bgDark="bg-primary" />
					)}
				</List>
				<List title="Popular" url="/animes/popular">
					{popularAnime ? (
						popularAnime
							.slice(0, 20)
							.map((anime) => (
								<Card key={anime.id} data={anime} />
							))
					) : (
						<Loader bgLight="bg-white" bgDark="bg-primary" />
					)}
				</List>
				<List title="Trending Movies" url="/animes/trending-movies">
					{trendingMovies ? (
						trendingMovies
							.slice(0, 20)
							.map((anime) => (
								<Card key={anime.id} data={anime} />
							))
					) : (
						<Loader bgLight="bg-white" bgDark="bg-primary" />
					)}
				</List>
				<List title="Popular Movies" url="/animes/popular-movies">
					{popularMovies ? (
						popularMovies
							.slice(0, 20)
							.map((anime) => (
								<Card key={anime.id} data={anime} />
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
