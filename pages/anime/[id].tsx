import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useAnimeById } from "../../hooks/useAnimeById";
import Container from "../../components/Container/Container";
import { useState } from "react";
import MediaDetail from "../../components/MediaDetail/MediaDetail";
import { Tab, Tabs } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import Characters from "../../components/Characters/Characters";
import Staff from "../../components/Staff/Staff";

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
					<div className="flex">
						<div className="basis-[240px] flex-shrink-0 flex-grow-0 rounded-sm overflow-hidden">
							<img
								src={data.coverImage.extraLarge}
								alt={data.title.romaji}
								className="shadow-md"
							/>
						</div>
						<div className="p-8 flex flex-col justify-end w-full">
							<div className="flex items-end pt-24 mb-8">
								<h2 className="text-white font-bold text-xl md:text-3xl">
									{data.title.romaji}
								</h2>
							</div>
							<div className="py-4">
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
						<div className="bg-slate-200 dark:bg-secondary w-52 rounded-sm p-3 py-5">
							Test
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
