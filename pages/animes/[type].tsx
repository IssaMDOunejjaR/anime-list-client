import { useRouter } from "next/router";
import React from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import { useAnimesByPopularity } from "../../hooks/useAllAnimeData";
import { useAnimesByTrending } from "../../hooks/useAnimeByTrending";
import { useMoviesByPopularity } from "../../hooks/useMoviesByPopularity";

const PopularAnime = () => {
	const { data: popularAnime } = useAnimesByPopularity(1);

	return (
		<>
			{popularAnime ? (
				popularAnime.map((anime) => (
					<Card key={anime.id} data={anime} />
				))
			) : (
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			)}
		</>
	);

	// const { data: trendingMovies } = useMoviesByTrending(1);
};

const TrendingAnime = () => {
	const { data: trendingAnime } = useAnimesByTrending(1);

	return (
		<>
			{trendingAnime ? (
				trendingAnime.map((anime) => (
					<Card key={anime.id} data={anime} />
				))
			) : (
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			)}
		</>
	);
};

const PopularMovies = () => {
	const { data: popularMovies } = useMoviesByPopularity(1);

	return (
		<>
			{popularMovies ? (
				popularMovies.map((anime) => (
					<Card key={anime.id} data={anime} />
				))
			) : (
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			)}
		</>
	);
};

export default function AnimeList() {
	const { query } = useRouter();
	const title = query.type as string;

	let Component = PopularAnime;

	if (title === "trending") Component = TrendingAnime;
	else if (title === "popular-movies") Component = PopularMovies;
	else if (title === "trending-movies") Component = PopularMovies;

	return (
		<section className="p-5 min-h-screen">
			<h2 className="text-lg md:text-4xl capitalize font-extrabold w-2/4 border-b-2 pb-3">
				{title?.replace("-", " ")}
			</h2>
			<div className="flex flex-wrap py-4 gap-4">
				<Component />
			</div>
		</section>
	);
}
