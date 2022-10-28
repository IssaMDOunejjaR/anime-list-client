import HTMLReactParser from "html-react-parser";
import Link from "next/link";
import { useAnimePopularBySeason } from "../../hooks/useAnimePopularBySeason";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";

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

export const MainSkeleton = () => {
	return (
		<div className="relative w-full lg:basis-[900px] h-[400px] flex-grow-0 flex-shrink-0 overflow-hidden flex items-center rounded-md dark:bg-opacity-30 bg-[#555]">
			<div className="w-2/4 ml-8">
				<h2 className="font-bold text-lg md:text-2xl mb-4">
					<Skeleton variant="rectangular" />
				</h2>
				<p className="h-[100px] overflow-hidden mb-4 text-md text-[#ddd]">
					<Skeleton variant="rectangular" height="100%" />
				</p>
				<Skeleton variant="rectangular" />
			</div>
		</div>
	);
};

export default function Main() {
	const { data } = useAnimePopularBySeason({
		season: getCurrentSeason()?.toUpperCase(),
		seasonYear: new Date().getFullYear(),
	});
	const [scrollPos, setScrollPos] = useState(0);
	const [count, setCount] = useState(0);

	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (divRef && divRef.current) {
			divRef.current?.children[count]?.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "start",
			});

			// if (scrollPos >= divRef.current.scrollWidth) {
			// 	console.log(0);
			// 	setScrollPos(0);
			// }
			// divRef.current.scrollTo({
			// 	behavior: "smooth",
			// 	left: scrollPos,
			// });
			// console.log(scrollPos);
			// setScrollPos(
			// 	divRef.current.children[count].clientWidth * (count + 1)
			// );
		}
	}, [divRef, count]);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		if (divRef && divRef.current) {
	// 			setScrollPos(scrollPos + divRef.current.clientWidth);
	// 		}
	// 	};

	// 	divRef?.current?.addEventListener("scroll", handleScroll);

	// 	return () => {
	// 		divRef?.current?.removeEventListener("scroll", handleScroll);
	// 	};
	// }, [divRef]);

	return (
		<div className="w-full h-[550px] px-4 pr-8 flex flex-col justify-end">
			<div
				ref={divRef}
				className="flex items-center gap-4 py-4 overflow-x-scroll scrollbar-hide"
			>
				{data
					? data.media.map((anime) => (
							<motion.div
								key={anime.id}
								className="relative w-full lg:basis-[900px] h-[400px] flex-grow-0 flex-shrink-0 flex items-center rounded-md shadow-[0_2px_8px_#999] dark:shadow-[0_2px_8px_#333]"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
							>
								<div className="absolute w-full h-full">
									{anime.bannerImage && (
										<img
											src={anime.bannerImage}
											alt={anime.title.romaji}
											className="w-full h-full object-cover absolute right-0 opacity-[0.5]"
										/>
									)}
								</div>
								<div className="relative z-[1] w-2/4 ml-8">
									<h2 className="font-bold text-lg md:text-2xl mb-4">
										{anime.title.romaji}
									</h2>
									<p className="h-[100px] overflow-hidden mb-4 text-md text-[#333] dark:text-[#ddd]">
										{HTMLReactParser(anime.description)}
									</p>
									<Link href={`/anime/${anime.id}`}>
										<a className="custom-link !w-fit !px-8 md:!px-12">
											More
										</a>
									</Link>
								</div>
							</motion.div>
					  ))
					: [...new Array(7)].map((_, index) => (
							<MainSkeleton key={index} />
					  ))}
			</div>
			<div className="flex justify-center gap-3 p-8">
				{data ? (
					data.media.map((_anime, index) => (
						<div
							key={index}
							className={`relativw-10 cursor-pointer transition-all duration-300 ${
								count === index ? "opacity-100" : "opacity-20"
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
									{(_) => <></>}
								</CountdownCircleTimer>
							) : (
								<span className="w-[26px] h-[26px] border-2 rounded-full flex items-center justify-center"></span>
							)}
						</div>
					))
				) : (
					<>
						<Skeleton variant="circular" width={24} height={24} />
						<Skeleton variant="circular" width={24} height={24} />
						<Skeleton variant="circular" width={24} height={24} />
						<Skeleton variant="circular" width={24} height={24} />
						<Skeleton variant="circular" width={24} height={24} />
						<Skeleton variant="circular" width={24} height={24} />
						<Skeleton variant="circular" width={24} height={24} />
					</>
				)}
			</div>
		</div>
	);
}
