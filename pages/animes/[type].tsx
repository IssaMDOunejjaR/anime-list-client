import { useRouter } from "next/router";
import React from "react";
import Card from "../../components/Card/Card";

export default function AnimeList() {
	const { query } = useRouter();
	const title = query.type as string;

	return (
		<section className="p-5">
			<h2 className="text-lg md:text-2xl capitalize font-extrabold w-2/4 border-b-2 pb-3">
				{title?.replace("-", " ")}
			</h2>
			<div className="flex flex-wrap py-4 gap-4"></div>
		</section>
	);
}
