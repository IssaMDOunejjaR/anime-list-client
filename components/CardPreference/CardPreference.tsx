import { motion } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { Anime } from "../../types";

interface Props {
	data: Anime;
	setOpenProfile: Dispatch<SetStateAction<boolean>>;
}

export default function CardPreference({ data, setOpenProfile }: Props) {
	const [status, setStatus] = useState("");
	const [episode, setEpisode] = useState(1);

	return (
		<motion.div
			className="basis-[180px] flex-shrink-0 flex-grow-0 group relative"
			initial={{ scale: 0 }}
			whileInView={{ scale: 1 }}
			viewport={{ once: true }}
		>
			<div className="group relative">
				<img
					src={data.coverImage.extraLarge}
					alt={data.title.romaji}
					className="shadow-md w-[180px] h-[270px]"
				/>
				<div
					className={`absolute w-full h-full top-0 bg-secondary transition-all bg-opacity-90 z-[1] opacity-0 flex flex-col gap-4 justify-center items-center group-hover:opacity-100`}
				>
					<div className="flex flex-col gap-1 items-center">
						<h4 className="text-xs">Status:</h4>
						<select
							value={status}
							onChange={(e: any) => setStatus(e.target.value)}
						>
							<option value="FINISHED">Finished</option>
							<option value="WATCHING">Watching</option>
							<option value="DROPPED">Dropped</option>
							<option value="PLAN_TO_WATCH">Plan to watch</option>
						</select>
					</div>
					<div className="flex flex-col gap-1 items-center">
						<h4 className="text-xs">Episode:</h4>
						<select>
							{new Array(
								data.nextAiringEpisode
									? data.nextAiringEpisode.episode - 1
									: data.episodes
							)
								.fill(0)
								.map((_, index) => (
									<option value={index + 1}>
										{index + 1}
									</option>
								))}
						</select>
					</div>
					<Link href={`/anime/${data.id}`}>
						<a
							className="text-sm cursor-pointer bg-gradient-blue bg-clip-text text-transparent"
							onClick={() => setOpenProfile(false)}
						>
							Show more
						</a>
					</Link>
				</div>
			</div>
			<div className="py-2 flex flex-col">
				<h3 className="font-semibold truncate w-[170px]">
					{data.title.romaji}
				</h3>
			</div>
		</motion.div>
	);
}
