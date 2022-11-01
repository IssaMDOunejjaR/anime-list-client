import Link from "next/link";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { useAnimeById } from "../../hooks/useAnimeById";
import { Anime } from "../../types";
import Card, { CardSkeleton } from "../Card/Card";
import Character from "../Character/Character";

const Relation = ({ id }: { id: number }) => {
	const { data } = useAnimeById(id);

	if (!data) return <CardSkeleton />;

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
				className="text-lg md:text-xl py-2 font-semibold cursor-pointer border-b-[1px] lg:w-2/4"
				onClick={() =>
					title.toLowerCase() !== "trailer" &&
					title.toLowerCase() !== "anime relations" &&
					title.toLowerCase() !== "manga relations" &&
					title.toLowerCase() !== "recommendations" &&
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
				{data.relations.nodes.filter(
					(relation) => relation.type !== "MANGA"
				).length > 0 && (
					<Section title="Anime Relations" setTabValue={setTabValue}>
						<div className="flex flex-wrap gap-4 py-4">
							{data.relations.nodes
								.filter((relation) => relation.type !== "MANGA")
								.map((relation, index) => (
									<Relation key={index} id={relation.id} />
								))}
						</div>
					</Section>
				)}
				{data.relations.nodes.filter(
					(relation) => relation.type !== "ANIME"
				).length > 0 && (
					<Section title="Manga Relations" setTabValue={setTabValue}>
						<div className="flex flex-wrap gap-4 py-4">
							{data.relations.nodes
								.filter((relation) => relation.type !== "ANIME")
								.map((relation, index) => (
									<Relation key={index} id={relation.id} />
								))}
						</div>
					</Section>
				)}
				{data.characters.nodes.length > 0 && (
					<Section title="Characters" setTabValue={setTabValue}>
						<div className="flex flex-wrap gap-4 py-4">
							{data.characters.nodes
								.slice(0, 6)
								.map((character, index) => (
									<Character key={index} data={character} />
								))}
						</div>
					</Section>
				)}
				{data.staff.nodes.length > 0 && (
					<Section title="Staff" setTabValue={setTabValue}>
						<div className="flex flex-wrap gap-4 py-4">
							{data.staff.nodes.slice(0, 6).map((s, index) => (
								<Character key={index} data={s} />
							))}
						</div>
					</Section>
				)}
				{data.trailer && (
					<Section title="Trailer" setTabValue={setTabValue}>
						<div className="mt-4 w-3/4">
							<iframe
								className="aspect-video w-full"
								src={`https://www.youtube.com/embed/${data.trailer.id}`}
							></iframe>
						</div>
					</Section>
				)}
				{data.recommendations.nodes.length > 0 && (
					<Section title="Recommendations" setTabValue={setTabValue}>
						<div className="flex flex-wrap gap-4 py-4">
							{data.recommendations.nodes
								.slice(0, 5)
								.map((s, index) => (
									<Card
										key={index}
										data={s.mediaRecommendation as Anime}
									/>
								))}
						</div>
					</Section>
				)}
			</div>
		</div>
	);
}
