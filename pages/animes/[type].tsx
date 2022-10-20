import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import { useAnimesByPopularity } from "../../hooks/useAnimeByPopularity";
import { useAnimesByTrending } from "../../hooks/useAnimeByTrending";
import { useMoviesByPopularity } from "../../hooks/useMoviesByPopularity";
import { useMoviesByTrending } from "../../hooks/useMoviesByTrending";

interface Props {
	scrollY: number;
}

const PopularAnime = ({ scrollY }: Props) => {
	const {
		data: popularAnime,
		fetchNextPage,
		isFetchingNextPage,
	} = useAnimesByPopularity();

	useEffect(() => {
		if (document.body.clientHeight === scrollY + window.innerHeight) {
			fetchNextPage();
		}
	}, [scrollY]);

	return (
		<>
			{popularAnime ? (
				popularAnime.pages.map((page, index) => (
					<Fragment key={index}>
						{page.media.map((anime) => (
							<Card key={anime.id} data={anime} />
						))}
					</Fragment>
				))
			) : (
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			)}
			{isFetchingNextPage && (
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			)}
		</>
	);
};

const TrendingAnime = ({ scrollY }: Props) => {
	const {
		data: trendingAnime,
		fetchNextPage,
		isFetchingNextPage,
	} = useAnimesByTrending();

	useEffect(() => {
		if (document.body.clientHeight === scrollY + window.innerHeight) {
			fetchNextPage();
		}
	}, [scrollY]);

	return (
		<>
			{trendingAnime ? (
				trendingAnime.pages.map((page, index) => (
					<Fragment key={index}>
						{page.media.map((anime) => (
							<Card key={anime.id} data={anime} />
						))}
					</Fragment>
				))
			) : (
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			)}
			{isFetchingNextPage && (
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			)}
		</>
	);
};

const TrendingMovies = ({ scrollY }: Props) => {
	const {
		data: trendingMovies,
		fetchNextPage,
		isFetchingNextPage,
	} = useMoviesByTrending();

	useEffect(() => {
		if (document.body.clientHeight === scrollY + window.innerHeight) {
			fetchNextPage();
		}
	}, [scrollY]);

	return (
		<>
			{trendingMovies ? (
				trendingMovies.pages.map((page, index) => (
					<Fragment key={index}>
						{page.media.map((anime) => (
							<Card key={anime.id} data={anime} />
						))}
					</Fragment>
				))
			) : (
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			)}
			{isFetchingNextPage && (
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			)}
		</>
	);
};
const PopularMovies = ({ scrollY }: Props) => {
	const {
		data: popularMovies,
		fetchNextPage,
		isFetchingNextPage,
	} = useMoviesByPopularity();

	useEffect(() => {
		if (document.body.clientHeight === scrollY + window.innerHeight) {
			fetchNextPage();
		}
	}, [scrollY]);

	return (
		<>
			{popularMovies ? (
				popularMovies.pages.map((page, index) => (
					<Fragment key={index}>
						{page.media.map((anime) => (
							<Card key={anime.id} data={anime} />
						))}
					</Fragment>
				))
			) : (
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			)}
			{isFetchingNextPage && (
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			)}
		</>
	);
};

export default function AnimeList() {
	const [scrollY, setScrollY] = useState(0);
	const { query } = useRouter();
	const title = query.type as string;

	let Component = PopularAnime;

	if (title === "trending") Component = TrendingAnime;
	else if (title === "popular-movies") Component = PopularMovies;
	else if (title === "trending-movies") Component = TrendingMovies;

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<section className="p-5 min-h-screen">
				<h2 className="text-lg md:text-3xl capitalize font-extrabold w-2/4 border-b-[1px] pb-3">
					{title?.replace("-", " ")}
				</h2>
				<div className="flex flex-wrap py-4 gap-4">
					<Component scrollY={scrollY} />
				</div>
			</section>
		</>
	);
}
