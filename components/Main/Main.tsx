import HTMLReactParser from "html-react-parser";
import Link from "next/link";
import { useAnimePopularBySeason } from "../../hooks/useAnimePopularBySeason";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useRef, useState } from "react";
import { IconButton, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import SwiperBox from "../SwiperBox/SwiperBox";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

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
		<div className="relative w-full lg:basis-[1200px] h-[600px] flex-grow-0 flex-shrink-0 overflow-hidden flex items-center rounded-md dark:bg-opacity-30 bg-[#555]">
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
	const [count, setCount] = useState(0);

	return (
		<div className="w-full h-[750px] px-5 md:pr-8 flex flex-col justify-end">
			<SwiperBox activeSlide={count} setActiveSilde={setCount}>
				{data
					? data.media.map((anime) => (
							<SwiperSlide
								key={anime.id}
								className="md:!w-[1200px]"
							>
								<motion.div
									className="relative w-full lg:basis-[1200px] h-[600px] flex-grow-0 flex-shrink-0 flex items-center rounded-md"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									<div className="absolute w-full h-full">
										{anime.bannerImage && (
											<Image
												src={anime.bannerImage}
												alt={anime.title.romaji}
												className="w-full h-full object-cover absolute right-0"
												layout="fill"
											/>
										)}
										<div className="absolute w-full h-full bg-gradient-to-r from-slate-400 dark:from-[#111] to-transparent z-[1]"></div>
									</div>
									<div className="relative z-[1] w-2/4 ml-8">
										<h2 className="font-bold text-lg md:text-2xl mb-4">
											{anime.title.romaji}
										</h2>
										<p className="h-[100px] overflow-hidden mb-4 text-md text-[#333] dark:text-[#ddd]">
											{HTMLReactParser(anime.description)}
										</p>
										<Link
											href={`/anime/${anime.id}`}
											prefetch={false}
										>
											<a className="custom-link !w-fit !px-8 md:!px-12">
												More
											</a>
										</Link>
									</div>
								</motion.div>
							</SwiperSlide>
					  ))
					: [...new Array(7)].map((_, index) => (
							<MainSkeleton key={index} />
					  ))}
			</SwiperBox>
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
								<span className="w-[26px] h-[26px] border-2 border-[#bbb] rounded-full flex items-center justify-center"></span>
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
