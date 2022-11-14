import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { addMediaPreference } from "../../fetchers/user";
import { useAnimeById } from "../../hooks/useAnimeById";
import { useLoggedUser } from "../../hooks/useLoggedUser";
import { PreferenceStatus } from "../../types/user";

interface Props {
	animeId: number;
	setOpenProfile: Dispatch<SetStateAction<boolean>>;
}

export default function CardPreference({ animeId, setOpenProfile }: Props) {
	const { data: me } = useLoggedUser();
	const { data } = useAnimeById(animeId);
	const [episode, setEpisode] = useState(0);

	const { mutate: addPreference } = useMutation(addMediaPreference);

	const queryClient = useQueryClient();

	const preference = me?.animePreferences.find(
		(pref) => pref.animeId === animeId
	);

	const handleAddMediaPreference = (status: PreferenceStatus) => {
		if (data) {
			addPreference(
				{
					animeId: data.id,
					id: preference ? preference.id : 0,
					status,
					episode,
				},
				{
					onSuccess: (_) => {
						queryClient.invalidateQueries(["logged-user"]);
					},
					onError: (err) => console.log(err),
				}
			);
		}
	};

	const handleStatusChange = (e: any) => {
		handleAddMediaPreference(e.target.value);
	};

	useEffect(() => {
		if (preference) setEpisode(preference.episode);
	}, [preference]);

	useEffect(() => {
		if (preference) handleAddMediaPreference(preference?.status);
	}, [episode]);

	if (!data || !me) return null;

	return (
		<motion.div
			className="basis-[180px] flex-shrink-0 flex-grow-0 group relative"
			initial={{ scale: 0 }}
			whileInView={{ scale: 1 }}
			viewport={{ once: true }}
		>
			<div className="group relative">
				<Image
					src={data.coverImage.extraLarge}
					alt={data.title.romaji}
					className="shadow-md"
					width={180}
					height={270}
				/>
				<div
					className={`absolute w-full h-full top-0 bg-secondary transition-all bg-opacity-90 z-[1] opacity-0 flex flex-col gap-4 justify-center items-center group-hover:opacity-100`}
				>
					<div className="flex flex-col gap-1 items-center">
						<h4 className="text-xs">Status:</h4>
						<select
							className="p-1"
							value={preference?.status}
							onChange={handleStatusChange}
						>
							<option value="NOTHING">Nothing for now</option>
							<option value="FINISHED">Finished</option>
							<option value="WATCHING">Watching</option>
							<option value="DROPPED">Dropped</option>
							<option value="PLAN_TO_WATCH">Plan to watch</option>
						</select>
					</div>
					<div className="flex flex-col gap-1 items-center">
						<h4 className="text-xs">Episode:</h4>
						<select
							className="p-1"
							value={preference?.episode}
							onChange={(e: any) => setEpisode(+e.target.value)}
							disabled={
								preference?.status !== PreferenceStatus.WATCHING
							}
						>
							{new Array(
								data.nextAiringEpisode
									? data.nextAiringEpisode.episode
									: data.episodes + 1
							)
								.fill(0)
								.map((_, index) => (
									<option key={index} value={index}>
										{index}
									</option>
								))}
						</select>
					</div>
					<Link href={`/anime/${data.id}`} prefetch={false}>
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
