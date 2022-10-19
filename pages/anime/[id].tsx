import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useAnimeById } from "../../hooks/useAnimeById";
import Container from "../../components/Container/Container";
import { ReactNode, useState } from "react";
import MediaDetail from "../../components/MediaDetail/MediaDetail";
import { Tab, Tabs } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import Characters from "../../components/Characters/Characters";
import Staff from "../../components/Staff/Staff";
import moment from "moment";

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
	const { data } = useAnimeById(id);

	const [extendDescription, setExtendDescription] = useState(false);
	const [tabValue, setTabValue] = useState("overview");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setTabValue(newValue);
	};

	if (!data)
		return (
			<div className="p-14">
				<Loader bgLight="bg-white" bgDark="bg-primary" />
			</div>
		);

	const duration = moment.duration(
		data.nextAiringEpisode?.timeUntilAiring * 1000,
		"milliseconds"
	);

	console.log(duration);

	return (
		<section>
			<div className={`p-8 pt-24 relative`}>
				<div className="absolute top-0 left-0 -z-10 h-[280px] w-full">
					<div className="absolute top-0 h-full w-full bg-secondary bg-opacity-80 z-[1]"></div>
					<img
						src={data.bannerImage}
						alt={data.title.romaji}
						className="h-full w-full object-cover"
					/>
				</div>
				<Container>
					<div className="flex flex-col items-center md:flex-row">
						<div className="rounded-sm overflow-hidden">
							<img
								src={data.coverImage.extraLarge}
								alt={data.title.romaji}
								className="shadow-md"
							/>
						</div>
						<div className="p-8 flex flex-col justify-end items-center md:items-start w-full">
							<div className="flex items-end md:pt-24 mb-8">
								<h2 className="text-white font-bold text-xl md:text-3xl">
									{data.title.romaji}
								</h2>
							</div>
							<div className="py-4 w-full">
								<h3 className="font-semibold text-md md:text-xl mb-4">
									Synopsis
								</h3>
								<p
									className={`text-[14px] text-primary dark:text-[#bbb] w-full transition-all ${
										extendDescription ? "h-fit" : "h-32"
									} text-ellipsis overflow-hidden`}
								>
									{parse(data.description)}
								</p>
								<span
									className="text-xs cursor-pointer bg-gradient-blue bg-clip-text text-transparent"
									onClick={() =>
										setExtendDescription(!extendDescription)
									}
								>
									Show more
								</span>
							</div>
						</div>
					</div>
				</Container>
			</div>
			<Tabs
				value={tabValue}
				onChange={handleChange}
				aria-label="scrollable prevent tabs example"
				className="!border-b-[1px] !border-[#ccc] dark:!border-light-gray"
				centered
			>
				<Tab label="Overview" value="overview" />
				<Tab label="Characters" value="characters" />
				<Tab label="Staff" value="staff" />
			</Tabs>
			<div className="p-8">
				<Container>
					<div className="flex gap-8">
						<div className="w-52 flex flex-col h-fit space-y-3">
							<div className="p-6 space-y-4 rounded-sm w-full bg-slate-200 dark:bg-secondary">
								{data.nextAiringEpisode && (
									<Information title="Airing">
										<span className="bg-gradient-blue bg-clip-text text-transparent font-semibold normal-case">
											{"Ep "}
											{data.nextAiringEpisode.episode}
											{": "}
											{`${duration.days()}d ${duration.hours()}h ${duration.minutes()}min`}
										</span>
									</Information>
								)}
								<Information title="Format">
									<span>{data.format}</span>
								</Information>
								<Information title="Episode Duration">
									<span>{data.duration} min</span>
								</Information>
								<Information title="Status">
									<span>{data.status.toLowerCase()}</span>
								</Information>
								<Information title="Start Date">
									<span>
										{moment(
											`${data.startDate.month} ${data.startDate.day} ${data.startDate.year}`
										).format("MMM Do YYYY")}
									</span>
								</Information>
								<Information title="End Date">
									<span>
										{moment(
											`${data.endDate.month} ${data.endDate.day} ${data.endDate.year}`
										).format("MMM Do YYYY")}
									</span>
								</Information>
								<Information title="Season">
									<span>{data.season?.toLowerCase()}</span>
								</Information>
								<Information title="Studios">
									{data.studios.edges.map((studio) => (
										<span>{studio.node.name}</span>
									))}
								</Information>
								<Information title="Producers">
									<span>{data.format}</span>
								</Information>
								<Information title="Source">
									<span>{data.source.toLowerCase()}</span>
								</Information>
								<Information title="Genres">
									{data.genres.map((genre) => (
										<span>{genre}</span>
									))}
								</Information>
								<Information title="Romaji">
									<span>{data.title.romaji}</span>
								</Information>
								<Information title="English">
									<span>{data.title.english}</span>
								</Information>
								<Information title="Native">
									<span>{data.title.native}</span>
								</Information>
							</div>
							<div className="p-6 space-y-4 rounded-sm w-full bg-slate-200 dark:bg-secondary">
								<Information title="External Links">
									<span>
										{data.externalLinks.map((link) => (
											<a
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
															src={link.icon}
															alt={link.site}
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
										))}
									</span>
								</Information>
							</div>
						</div>
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
							{tabValue === "staff" && <Staff data={data} />}
						</div>
					</div>
				</Container>
			</div>
		</section>
	);
}
