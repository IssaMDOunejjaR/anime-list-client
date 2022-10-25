import HTMLReactParser from "html-react-parser";
import Link from "next/link";
import { useAnimePopularBySeason } from "../../hooks/useAnimePopularBySeason";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useRef, useState } from "react";

function getCurrentSeason() {
	const now = new Date();
	const month = now.getMonth() + 1;

	if (month > 3 && month < 6) {
		return "spring";
	}

	if (month > 6 && month < 9) {
		return "summer";
	}

	if (month > 9 && month < 12) {
		return "fall";
	}

	if (month >= 1 && month < 3) {
		return "winter";
	}

	const day = now.getDate();

	if (month === 3) {
		return day < 22 ? "winter" : "spring";
	}

	if (month === 6) {
		return day < 22 ? "spring" : "summer";
	}

	if (month === 9) {
		return day < 22 ? "summer" : "fall";
	}

	return day < 22 ? "fall" : "winter";
}

export default function Main() {
	const { data } = useAnimePopularBySeason({
		season: getCurrentSeason()?.toUpperCase(),
		seasonYear: new Date().getFullYear(),
	});
	const [count, setCount] = useState(0);

	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (divRef) {
			divRef.current?.children[count]?.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "start",
			});
		}
	}, [divRef, count]);

	return (
		<div className="w-full h-[45vh] px-4 pr-8 overflow-hidden flex flex-col justify-center">
			<div
				ref={divRef}
				className="flex items-center gap-4 overflow-x-scroll scrollbar-hide"
			>
				{data
					? data.media.map((anime) => (
							<div className="relative w-full lg:basis-[900px] h-[400px] flex-grow-0 flex-shrink-0 overflow-hidden flex items-center rounded-md shadow-2xl">
								<div className="absolute w-full h-full">
									{anime.bannerImage && (
										<img
											src={anime.bannerImage}
											alt={anime.title.romaji}
											className="w-full h-full object-cover absolute right-0 opacity-[0.25]"
										/>
									)}
								</div>
								<div className="relative z-[1] w-2/4 ml-8">
									<h2 className="font-bold text-lg md:text-2xl mb-4">
										{anime.title.romaji}
									</h2>
									<p className="h-[100px] overflow-hidden mb-4 text-md text-[#ddd]">
										{HTMLReactParser(anime.description)}
									</p>
									<Link href={`/anime/${anime.id}`}>
										<a className="custom-link !w-fit !px-8 md:!px-12">
											More
										</a>
									</Link>
								</div>
							</div>
					  ))
					: null}
			</div>
			<div className="flex justify-center gap-3 p-8">
				{data
					? data.media.map((_anime, index) => (
							<div
								key={index}
								className={`relativw-10 cursor-pointer transition-all duration-300 ${
									count === index
										? "opacity-100"
										: "opacity-20"
								}`}
								onClick={() => setCount(index)}
							>
								{count === index ? (
									<CountdownCircleTimer
										isPlaying
										initialRemainingTime={5}
										duration={5}
										colors={[
											"#004777",
											"#F7B801",
											"#A30000",
											"#A30000",
										]}
										colorsTime={[7, 5, 2, 0]}
										size={26}
										strokeWidth={2}
										onComplete={() => {
											setCount(
												count === data.media.length - 1
													? 0
													: count + 1
											);

											return { shouldRepeat: true };
										}}
									>
										{({ remainingTime }) => (
											<span className="text-xs">
												{remainingTime}
											</span>
										)}
									</CountdownCircleTimer>
								) : (
									<span className="w-[26px] h-[26px] border-2 rounded-full flex items-center justify-center">
										<span className="bg-white rounded-full w-1 h-1"></span>
									</span>
								)}
							</div>
					  ))
					: null}
			</div>
		</div>
	);
}
