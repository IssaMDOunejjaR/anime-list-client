import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Card, { CardSkeleton } from "../../components/Card/Card";
import ScrollTop from "../../components/ScrollTop/ScrollTop";
import { useMediaByGenre } from "../../hooks/useMediaByGenre";

export default function Genre() {
	const { query } = useRouter();
	const genre = query.genre as string;
	const [scrollY, setScrollY] = useState(0);
	const { data, fetchNextPage, isFetchingNextPage } = useMediaByGenre(genre);

	const placeholder = [...new Array(10)].map((_, index) => (
		<CardSkeleton key={index} />
	));

	useEffect(() => {
		if (document.body.clientHeight / 2 < scrollY) {
			fetchNextPage();
		}
	}, [scrollY]);

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
				<title>{genre}</title>
			</Head>
			<section className="p-5 min-h-screen">
				<h2 className="text-lg md:text-3xl capitalize font-extrabold w-2/4 border-b-[1px] pb-3">
					{genre}
				</h2>
				<div className="flex flex-wrap py-4 gap-4 justify-between">
					{data
						? data.pages.map((page, index) => (
								<Fragment key={index}>
									{page.media.map((anime) => (
										<Card key={anime.id} data={anime} />
									))}
								</Fragment>
						  ))
						: placeholder}
					{isFetchingNextPage && placeholder}
				</div>
			</section>
			<ScrollTop />
		</>
	);
}
