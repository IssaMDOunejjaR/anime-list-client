import { useEffect, useRef, useState } from "react";
import { Anime } from "../../types";
import parse from "html-react-parser";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";

export const CardSkeleton = () => {
	return (
		<div className="basis-[170px] h-[300px] flex-shrink-0 flex-grow-0 group relative flex flex-col">
			<div className="flex-1">
				<Skeleton variant="rectangular" height="100%" />
			</div>
			<div className="py-2 flex flex-col">
				<Skeleton variant="rectangular" />
			</div>
		</div>
	);
};

interface Props {
	data: Anime;
}

export default function Card({ data }: Props) {
	const [windowSize, setWindowSize] = useState(0);
	const [cardPosition, setCardPosition] = useState(0);
	const [isScrolled, setIsScrolled] = useState(false);

	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setWindowSize(window.innerWidth);

		if (cardRef && cardRef.current) {
			setCardPosition(cardRef.current.getBoundingClientRect().left);
		}

		const handleResize = () => {
			setWindowSize(window.innerWidth);

			if (cardRef && cardRef.current) {
				setCardPosition(cardRef.current.getBoundingClientRect().left);
			}
		};

		window.addEventListener("resize", handleResize);

		if (isScrolled) setIsScrolled(false);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [cardRef]);

	useEffect(() => {
		const handleScroll = () => {
			if (cardRef && cardRef.current) {
				setCardPosition(cardRef.current.getBoundingClientRect().left);
			}
		};

		if (cardRef && cardRef.current) {
			cardRef.current.parentElement?.addEventListener(
				"scroll",
				handleScroll
			);
		}

		return () => {
			if (cardRef && cardRef.current) {
				cardRef.current.parentElement?.removeEventListener(
					"scroll",
					handleScroll
				);
			}
		};
	}, [cardRef]);

	return (
		<motion.div
			ref={cardRef}
			className="basis-[170px] flex-shrink-0 flex-grow-0 group relative"
			initial={{ scale: 0 }}
			whileInView={{ scale: 1 }}
			viewport={{ once: true }}
		>
			<div>
				<img
					src={data.coverImage.extraLarge}
					alt={data.title.romaji}
					className="shadow-md w-[170px] h-[260px]"
					draggable={false}
				/>
			</div>
			<div className="py-2 flex flex-col">
				<h3 className="font-semibold truncate w-[170px]">
					{data.title.romaji}
				</h3>
			</div>
			<div
				className={`overflow-hidden w-0 group-hover:w-full group-hover:md:w-[250px] transition-all absolute h-full top-0 ${
					cardPosition > windowSize / 2
						? "left md:right-full"
						: "md:left-full"
				} z-10 text-black`}
			>
				<div className="md:px-3 w-[170px] md:w-[250px] h-full">
					<div className="bg-slate-200 h-full dark:bg-white p-3 flex flex-col w-full relative shadow-md">
						<span
							className={`hidden md:block absolute top-2 ${
								cardPosition > windowSize / 2
									? "left-full border-l-slate-200 dark:border-l-white"
									: "right-full border-r-slate-200 dark:border-r-white"
							} border-8 border-transparent z-20`}
						></span>
						<h3 className="font-semibold">{data.title.romaji}</h3>
						<span className="mb-2 text-xs italic text-[#444] capitalize">
							{data.format?.toLowerCase()}
							{data.format !== "MOVIE" &&
								data.format !== "MANGA" &&
								(data.episodes
									? ` | Episodes: ${data.episodes}`
									: ` | Last Episode: ${
											data.nextAiringEpisode?.episode - 1
									  }`)}
						</span>
						<p className="text-xs text-primary mb-3 overflow-hidden max-h-32 text-ellipsis">
							{parse(data.description || "No description")}
						</p>
						<div className="flex flex-wrap justify-center mt-auto p-2">
							{data.genres.map((genre, index) => (
								<Link
									key={index}
									href={`/genre/${genre.toLowerCase()}`}
								>
									<a key={index} className="text-[10px] px-1">
										{genre}
									</a>
								</Link>
							))}
						</div>
						<Link href={`/anime/${data.id}`}>
							<a className="custom-link">More</a>
						</Link>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
