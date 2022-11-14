import React, {
	Dispatch,
	MutableRefObject,
	ReactNode,
	SetStateAction,
} from "react";
import { Anime } from "../../types";
import Card, { CardSkeleton } from "../Card/Card";
import Character from "../Character/Character";

const Relation = ({ relation }: { relation: Anime }) => {
	if (!relation) return <CardSkeleton />;

	return <Card data={relation} />;
};

interface SectionProps {
	children?: ReactNode;
	title: string;
	tabsRef: MutableRefObject<HTMLButtonElement | null>;
	setTabValue: Dispatch<SetStateAction<string>>;
}

const Section = ({ title, children, tabsRef, setTabValue }: SectionProps) => {
	const handleClick = () => {
		if (
			title.toLowerCase() !== "trailer" &&
			title.toLowerCase() !== "anime relations" &&
			title.toLowerCase() !== "manga relations" &&
			title.toLowerCase() !== "recommendations"
		) {
			if (tabsRef && tabsRef.current) {
				window.scrollTo({
					top: tabsRef.current.getBoundingClientRect().top,
					behavior: "smooth",
				});

				setTabValue(title.toLocaleLowerCase());
			}
		}
	};
	return (
		<div className="my-4">
			<h3
				className="text-lg md:text-xl py-2 font-semibold cursor-pointer border-b-[1px] lg:w-2/4"
				onClick={handleClick}
			>
				{title}
			</h3>
			{children}
		</div>
	);
};

interface MediaDetailProps {
	data: Anime;
	tabsRef: MutableRefObject<HTMLButtonElement | null>;
	setTabValue: Dispatch<SetStateAction<string>>;
}

export default function MediaDetail({
	data,
	tabsRef,
	setTabValue,
}: MediaDetailProps) {
	return (
		<div>
			<div className="flex-1">
				{data.relations.nodes.filter(
					(relation) => relation.type !== "MANGA"
				).length > 0 && (
					<Section
						title="Anime Relations"
						tabsRef={tabsRef}
						setTabValue={setTabValue}
					>
						<div className="flex flex-wrap gap-4 py-4">
							{data.relations.nodes
								.filter((relation) => relation.type !== "MANGA")
								.map((relation, index) => (
									<Relation
										key={index}
										relation={relation as any}
									/>
								))}
						</div>
					</Section>
				)}
				{data.relations.nodes.filter(
					(relation) => relation.type !== "ANIME"
				).length > 0 && (
					<Section
						title="Manga Relations"
						tabsRef={tabsRef}
						setTabValue={setTabValue}
					>
						<div className="flex flex-wrap gap-4 py-4">
							{data.relations.nodes
								.filter((relation) => relation.type !== "ANIME")
								.map((relation, index) => (
									<Relation
										key={index}
										relation={relation as any}
									/>
								))}
						</div>
					</Section>
				)}
				{data.characters.nodes.length > 0 && (
					<Section
						title="Characters"
						tabsRef={tabsRef}
						setTabValue={setTabValue}
					>
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
					<Section
						title="Staff"
						tabsRef={tabsRef}
						setTabValue={setTabValue}
					>
						<div className="flex flex-wrap gap-4 py-4">
							{data.staff.nodes.slice(0, 6).map((s, index) => (
								<Character key={index} data={s} />
							))}
						</div>
					</Section>
				)}
				{data.trailer && (
					<Section
						title="Trailer"
						tabsRef={tabsRef}
						setTabValue={setTabValue}
					>
						<div className="mt-4 w-3/4">
							<iframe
								className="aspect-video w-full"
								src={`https://www.youtube.com/embed/${data.trailer.id}`}
							></iframe>
						</div>
					</Section>
				)}
				{data.recommendations.nodes.length > 0 && (
					<Section
						title="Recommendations"
						tabsRef={tabsRef}
						setTabValue={setTabValue}
					>
						<div className="flex flex-wrap gap-4 py-4">
							{data.recommendations.nodes
								.filter((media) => media.mediaRecommendation)
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
