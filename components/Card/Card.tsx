import { useEffect, useRef, useState } from "react";
import { Anime } from "../../types";

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
		<div
			ref={cardRef}
			className="basis-[170px] flex-shrink-0 flex-grow-0 group relative"
		>
			<div>
				<img
					src={data.coverImage.extraLarge}
					alt={data.title.romaji}
					className="shadow-md w-[170px] h-[260px]"
				/>
			</div>
			<div className="p-2 flex">
				<h3 className="font-semibold">{data.title.romaji}</h3>
			</div>
			<div
				className={`overflow-hidden w-0 group-hover:w-[250px] transition-all absolute h-full top-0 ${
					cardPosition > windowSize / 2 ? "right-full" : "left-full"
				} z-10 text-black`}
			>
				<div className="px-3 w-[250px] h-full">
					<div className="bg-slate-200 h-full dark:bg-white p-3 flex flex-col w-full relative shadow-md">
						<span
							className={`absolute top-2 ${
								cardPosition > windowSize / 2
									? "left-full border-l-slate-200 dark:border-l-white"
									: "right-full border-r-slate-200 dark:border-r-white"
							} border-8 border-transparent z-20`}
						></span>
						<h3 className="font-semibold mb-2">
							{data.title.romaji}
						</h3>
						<p className="text-xs text-primary mb-3 overflow-hidden max-h-32 text-ellipsis">
							{data.description}
						</p>
						<div className="flex flex-wrap justify-center mt-auto p-2">
							{data.genres.map((genre, index) => (
								<span key={index} className="text-[10px] px-1">
									{genre}
								</span>
							))}
						</div>
						<a href="#" className="custom-link">
							More
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
