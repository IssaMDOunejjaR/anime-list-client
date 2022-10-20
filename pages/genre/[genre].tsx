import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import { useMediaByGenre } from "../../hooks/useMediaByGenre";

export default function Genre() {
	const { query } = useRouter();
	const genre = query.genre as string;
	const [scrollY, setScrollY] = useState(0);
	const { data, fetchNextPage, isFetchingNextPage } = useMediaByGenre(genre);

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
				<h2 className="text-lg md:text-4xl capitalize font-extrabold w-2/4 border-b-2 pb-3">
					{genre}
				</h2>
				<div className="flex flex-wrap py-4 gap-4 justify-center">
					{data ? (
						data.pages.map((page, index) => (
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
				</div>
			</section>
		</>
	);
}
