import Link from "next/link";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { useAnimeById } from "../../hooks/useAnimeById";
import { Anime } from "../../types";
import Card from "../Card/Card";
import Character from "../Character/Character";

const Relation = ({ id }: { id: number }) => {
	const { data } = useAnimeById(id);

	if (!data) return null;

	return <Card data={data} />;
};

interface SectionProps {
	children?: ReactNode;
	title: string;
	setTabValue: Dispatch<SetStateAction<string>>;
}

const Section = ({ title, children, setTabValue }: SectionProps) => {
	return (
		<div className="my-4">
			<h3
				className="text-lg md:text-xl font-semibold cursor-pointer"
				onClick={() =>
					title.toLowerCase() !== "trailer" &&
					title.toLowerCase() !== "anime relations" &&
					title.toLowerCase() !== "manga relations" &&
					setTabValue(title.toLocaleLowerCase())
				}
			>
				{title}
			</h3>
			{children}
		</div>
	);
};

interface MediaDetailProps {
	data: Anime;
	setTabValue: Dispatch<SetStateAction<string>>;
}

export default function MediaDetail({ data, setTabValue }: MediaDetailProps) {
	return (
		<div>
			<div className="flex-1">
				<Section title="Anime Relations" setTabValue={setTabValue}>
					<div className="flex flex-wrap gap-4 py-4">
						{data.relations.nodes
							.filter((relation) => relation.type !== "MANGA")
							.map((relation) => (
								<Relation id={relation.id} />
							))}
					</div>
				</Section>
				<Section title="Manga Relations" setTabValue={setTabValue}>
					<div className="flex flex-wrap gap-4 py-4">
						{data.relations.nodes
							.filter((relation) => relation.type !== "ANIME")
							.map((relation) => (
								<Relation id={relation.id} />
							))}
					</div>
				</Section>
				<Section title="Characters" setTabValue={setTabValue}>
					<div className="flex flex-wrap gap-4 py-4">
						{data.characters.nodes.slice(0, 6).map((character) => (
							<Character data={character} />
						))}
					</div>
				</Section>
				<Section title="Staff" setTabValue={setTabValue}>
					<div className="flex flex-wrap gap-4 py-4">
						{data.staff.nodes.slice(0, 6).map((s) => (
							<Character data={s} />
						))}
					</div>
				</Section>
				<Section title="Trailer" setTabValue={setTabValue}>
					<div className="mt-4 w-3/4">
						{data.trailer && (
							<iframe
								className="aspect-video w-full"
								src={`https://www.youtube.com/embed/${data.trailer.id}`}
							></iframe>
						)}
					</div>
				</Section>
			</div>
		</div>
	);
}
