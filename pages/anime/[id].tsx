import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useAnimeById } from "../../hooks/useAnimeById";
import Container from "../../components/Container/Container";
import { ReactNode, useEffect, useState } from "react";
import MediaDetail from "../../components/MediaDetail/MediaDetail";
import { IconButton, Skeleton, Tab, Tabs } from "@mui/material";
import Characters from "../../components/Characters/Characters";
import Staff from "../../components/Staff/Staff";
import moment from "moment";
import Link from "next/link";
import Head from "next/head";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useLoggedUser } from "../../hooks/useLoggedUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	addMediaFavorite,
	addMediaPreference,
	removeMediaFavorite,
} from "../../fetchers/user";
import { PreferenceStatus } from "../../types/user";

const AnimeInformationSkeleton = () => {
	return (
		<div className={`p-8 pt-56 relative`}>
			<div className="absolute top-0 left-0 -z-10 h-[400px] w-full">
				<div className="absolute top-0 h-full w-full bg-secondary bg-opacity-80 z-[1]"></div>
			</div>
			<Container>
				<div className="grid grid-cols-1 md:grid-cols-4">
					<div className="rounded-sm overflow-hidden flex justify-center">
						<Skeleton
							variant="rectangular"
							width={390}
							height={490}
						/>
					</div>
					<div className="p-8 w-full col-span-3">
						<div className="md:pt-24 mb-8">
							<Skeleton variant="text" height={40} width="50%" />
						</div>
						<div className="w-full relative pb-10">
							<Skeleton variant="text" height={30} width="20%" />
							<Skeleton variant="text" height={250} width="90%" />
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

const InformationSkeleton = () => {
	return (
		<div className="md:w-52 flex flex-col h-fit space-y-3">
			<div className="p-6 grid grid-cols-3 gap-4 flex-col md:flex rounded-sm w-full bg-slate-200 dark:bg-secondary">
				{[...new Array(15)].map((_, index) => (
					<div key={index}>
						<Skeleton variant="text" height={20} width="30%" />
						<Skeleton variant="text" height={20} width="10%" />
					</div>
				))}
			</div>
		</div>
	);
};

const Information = ({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) => {
	return (
		<div>
			<h4 className="font-semibold text-sm mb-1">{title}</h4>
			<p className="text-xs text-primary gap-y-1 flex flex-col capitalize">
				{children}
			</p>
		</div>
	);
};

export default function AnimeInformation() {
	const { query } = useRouter();
	const id = Number(query.id);
	const queryClient = useQueryClient();
	const { data: me } = useLoggedUser();
	const { data } = useAnimeById(id);

	const [extendDescription, setExtendDescription] = useState(false);
	const [tabValue, setTabValue] = useState("overview");

	const { mutate: addFavorite } = useMutation(addMediaFavorite);
	const { mutate: removeFavorite } = useMutation(removeMediaFavorite);
	const { mutate: addPreference } = useMutation(addMediaPreference);

	const buttonClass =
		"text-sm shadow-none capitalize p-2 px-4 w-full hover:bg-white hover:text-black";

	const media = me?.animePreferences.find((f) => f.animeId === data?.id);

	const [episode, setEpisode] = useState<number>(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
		setTabValue(newValue);
	};

	const handleEpisodeChange = (e: any) => {
		setEpisode(+e.target.value);
	};

	const handleAddMediaFavorite = () => {
		if (data && me) {
			const fav = me.favorites.find((f) => f.animeId === data.id);

			if (fav) {
				removeFavorite(
					{
						id: fav.id,
					},
					{
						onSuccess: (_) => {
							queryClient.invalidateQueries(["logged-user"]);
						},
						onError: (err) => console.log(err),
					}
				);
			} else {
				addFavorite(
					{ animeId: data.id },
					{
						onSuccess: (_) => {
							queryClient.invalidateQueries(["logged-user"]);
						},
						onError: (err) => console.log(err),
					}
				);
			}
		}
	};

	const handleAddMediaPreference = (status: PreferenceStatus) => {
		if (data) {
			const media = me?.animePreferences.find(
				(f) => f.animeId === data.id
			);

			addPreference(
				{
					animeId: data.id,
					id: media ? media.id : 0,
					status,
					episode:
						status === PreferenceStatus.FINISHED
							? data.nextAiringEpisode
								? data.nextAiringEpisode.episode - 1
								: data.episodes
							: episode,
				},
				{
					onSuccess: (_) =>
						queryClient.invalidateQueries(["logged-user"]),
					onError: (err) => console.log(err),
				}
			);
		}
	};

	const duration = moment.duration(
		Number(data?.nextAiringEpisode?.timeUntilAiring) * 1000,
		"milliseconds"
	);

	useEffect(() => {
		if (media) setEpisode(media.episode);
	}, [media]);

	useEffect(() => {
		if (media) handleAddMediaPreference(media?.status);
	}, [episode]);

	return (
		<>
			<Head>
				<title>{data?.title.romaji}</title>
			</Head>
			<section>
				{data ? (
					<div className={`p-8 px-5 pt-48 relative`}>
						<div className="absolute top-0 left-0 -z-10 h-[400px] w-full">
							<div className="absolute top-0 h-full w-full bg-secondary bg-opacity-80 z-[1]"></div>
							{data.bannerImage && (
								<img
									src={data.bannerImage}
									alt={data.title.romaji}
									className="h-full w-full object-cover"
								/>
							)}
						</div>
						<Container>
							<div className="flex flex-col items-center lg:flex-row">
								<div className="rounded-sm overflow-hidden w-[350px] flex justify-center">
									<img
										src={data.coverImage.extraLarge}
										alt={data.title.romaji}
										className="shadow-md w-[300px] h-[490px]"
									/>
								</div>
								<div className="p-8 flex-1">
									<div className="lg:pt-24 mb-8">
										<h2 className="text-white flex flex-col lg:flex-row justify-between items-center text-center gap-y-5 lg:text-left font-bold text-xl md:text-3xl">
											{data.title.romaji}
											{me && (
												<span className="flex gap-2">
													<select
														className="px-2 text-sm text-black dark:text-inherit"
														value={episode}
														onChange={
															handleEpisodeChange
														}
														disabled={
															media?.status !==
															PreferenceStatus.WATCHING
														}
													>
														{new Array(
															data.nextAiringEpisode
																? data
																		.nextAiringEpisode
																		.episode -
																  1 +
																  1
																: data.episodes +
																  1
														)
															.fill(0)
															.map((_, index) => (
																<option
																	key={index}
																	value={
																		index
																	}
																>
																	{index}
																</option>
															))}
													</select>
													<IconButton
														className="!shadow-none !text-white"
														onClick={
															handleAddMediaFavorite
														}
													>
														{me?.favorites.find(
															(f) =>
																f.animeId ===
																data.id
														) ? (
															<StarIcon className="!text-yellow-400" />
														) : (
															<StarOutlineIcon />
														)}
													</IconButton>
													<IconButton className="group relative !shadow-none !bg-red-500 !text-white transition-all hover:!rounded-none">
														<AddIcon />
														<div className="absolute z-[2] w-[200px] h-0 transition-all delay-100 top-full right-0 bg-red-500 overflow-hidden group-hover:h-[180px]">
															<div
																className={`${buttonClass} ${
																	!media ||
																	(media &&
																		media.status ===
																			PreferenceStatus.NOTHING)
																		? "bg-white text-black"
																		: null
																}`}
																onClick={() =>
																	handleAddMediaPreference(
																		PreferenceStatus.NOTHING
																	)
																}
															>
																Nothing for now
															</div>
															<div
																className={`${buttonClass} ${
																	media &&
																	media.status ===
																		PreferenceStatus.PLAN_TO_WATCH
																		? "bg-white text-black"
																		: null
																}`}
																onClick={() =>
																	handleAddMediaPreference(
																		PreferenceStatus.PLAN_TO_WATCH
																	)
																}
															>
																Plan to watch
															</div>
															<div
																className={`${buttonClass} ${
																	media &&
																	media.status ===
																		PreferenceStatus.WATCHING
																		? "bg-white text-black"
																		: null
																}`}
																onClick={() =>
																	handleAddMediaPreference(
																		PreferenceStatus.WATCHING
																	)
																}
															>
																Watching
															</div>
															<div
																className={`${buttonClass} ${
																	media &&
																	media.status ===
																		PreferenceStatus.DROPPED
																		? "bg-white text-black"
																		: null
																}`}
																onClick={() =>
																	handleAddMediaPreference(
																		PreferenceStatus.DROPPED
																	)
																}
															>
																Dropped
															</div>
															<div
																className={`${buttonClass} ${
																	media &&
																	media.status ===
																		PreferenceStatus.FINISHED
																		? "bg-white text-black"
																		: null
																}`}
																onClick={() =>
																	handleAddMediaPreference(
																		PreferenceStatus.FINISHED
																	)
																}
															>
																Finished
															</div>
														</div>
													</IconButton>
												</span>
											)}
										</h2>
									</div>
									<div className="w-full relative pb-10">
										<h3 className="font-semibold text-md text-center md:text-left md:text-xl mb-1">
											Synopsis
										</h3>
										<p
											className={`text-[14px] text-primary dark:text-[#bbb] w-full transition-all ${
												extendDescription
													? "h-full"
													: "h-[135px]"
											} text-ellipsis overflow-hidden py-2`}
										>
											{parse(
												data.description ||
													"No description"
											)}
										</p>
										{data.description && (
											<span className="absolute bottom-0 right-0 bg-white dark:bg-primary">
												<span
													className="text-xs cursor-pointer bg-gradient-blue bg-clip-text text-transparent"
													onClick={() =>
														setExtendDescription(
															!extendDescription
														)
													}
												>
													Show more
												</span>
											</span>
										)}
									</div>
								</div>
							</div>
						</Container>
					</div>
				) : (
					<AnimeInformationSkeleton />
				)}
				<Tabs
					value={tabValue}
					onChange={handleChange}
					aria-label="scrollable prevent tabs example"
					className="!border-b-[1px] !border-[#ccc] dark:!border-light-gray"
					centered
				>
					<Tab
						label="Overview"
						value="overview"
						className={`${
							tabValue !== "overview" ? "dark:!text-white" : null
						}`}
					/>
					<Tab
						label="Characters"
						value="characters"
						className={`${
							tabValue !== "characters"
								? "dark:!text-white"
								: null
						}`}
					/>
					<Tab
						label="Staff"
						value="staff"
						className={`${
							tabValue !== "staff" ? "dark:!text-white" : null
						}`}
					/>
				</Tabs>
				<div className="p-8 px-5">
					<Container>
						<div className="flex gap-8 flex-col md:flex-row">
							{data ? (
								<div className="md:w-52 flex flex-col h-fit space-y-3">
									<div className="p-6 grid grid-cols-3 gap-4 flex-col md:flex rounded-sm w-full bg-slate-200 dark:bg-secondary">
										{data.nextAiringEpisode && (
											<Information title="Airing">
												<span className="bg-gradient-blue bg-clip-text text-transparent font-semibold normal-case">
													{"Ep "}
													{
														data.nextAiringEpisode
															.episode
													}
													{": "}
													{`${duration.days()}d ${duration.hours()}h ${duration.minutes()}min`}
												</span>
											</Information>
										)}
										{data.format && (
											<Information title="Format">
												<span>{data.format}</span>
											</Information>
										)}
										{(data.episodes ||
											data.nextAiringEpisode) && (
											<Information title="Episodes">
												<span>
													{data.episodes
														? data.episodes
														: data.nextAiringEpisode
																.episode - 1}
												</span>
											</Information>
										)}
										{data.duration && (
											<Information title="Episode Duration">
												<span>{data.duration} min</span>
											</Information>
										)}
										<Information title="Status">
											<span>
												{data.status
													.toLowerCase()
													.replace(
														new RegExp("_", "g"),
														" "
													)}
											</span>
										</Information>
										{data.startDate.year && (
											<Information title="Start Date">
												<span>
													{moment(
														`${data.startDate.month} ${data.startDate.day} ${data.startDate.year}`
													).format("MMM Do YYYY")}
												</span>
											</Information>
										)}
										{data.endDate.year && (
											<Information title="End Date">
												<span>
													{moment(
														`${data.endDate.month} ${data.endDate.day} ${data.endDate.year}`
													).format("MMM Do YYYY")}
												</span>
											</Information>
										)}
										{data.season && (
											<Information title="Season">
												<span>
													{data.season.toLowerCase()}
												</span>
											</Information>
										)}
										<Information title="Studios">
											{data.studios.edges.map(
												(studio, index) => (
													<span key={index}>
														{studio.node.name}
													</span>
												)
											)}
										</Information>
										<Information title="Source">
											<span>
												{data.source.toLowerCase()}
											</span>
										</Information>
										<Information title="Genres">
											{data.genres.map((genre, index) => (
												<Link
													key={index}
													href={`/genre/${genre.toLowerCase()}`}
													prefetch={false}
												>
													<a>{genre}</a>
												</Link>
											))}
										</Information>
										<Information title="Tags">
											{data.tags.map((tag, index) => (
												<Link
													key={index}
													href={`/tag/${tag.name.toLowerCase()}`}
													prefetch={false}
												>
													<a>{tag.name}</a>
												</Link>
											))}
										</Information>
										{data.title.romaji && (
											<Information title="Romaji">
												<span>{data.title.romaji}</span>
											</Information>
										)}
										{data.title.english && (
											<Information title="English">
												<span>
													{data.title.english}
												</span>
											</Information>
										)}
										{data.title.native && (
											<Information title="Native">
												<span>{data.title.native}</span>
											</Information>
										)}
									</div>
									<div className="p-6 rounded-sm w-full bg-slate-200 dark:bg-secondary">
										<Information title="External Links">
											<span className="gap-4 flex flex-col mt-2">
												{data.externalLinks.map(
													(link, index) => (
														<a
															key={index}
															href={link.url}
															className="capitalize flex items-center"
															target="_blank"
														>
															{link.icon && (
																<span
																	className={`block p-1 mr-3 rounded-sm`}
																	style={{
																		backgroundColor:
																			link.color,
																	}}
																>
																	<img
																		src={
																			link.icon
																		}
																		alt={
																			link.site
																		}
																		className="w-4 h-4"
																	/>
																</span>
															)}
															{link.site.toLowerCase()}
															<span className="ml-1">
																{link.language &&
																	`(${link.language})`}
															</span>
														</a>
													)
												)}
											</span>
										</Information>
									</div>
								</div>
							) : (
								<InformationSkeleton />
							)}
							{data && (
								<div className="flex-1">
									{tabValue === "overview" && (
										<MediaDetail
											data={data}
											setTabValue={setTabValue}
										/>
									)}
									{tabValue === "characters" && (
										<Characters data={data} />
									)}
									{tabValue === "staff" && (
										<Staff data={data} />
									)}
								</div>
							)}
						</div>
					</Container>
				</div>
			</section>
		</>
	);
}
