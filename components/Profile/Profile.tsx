import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "../Card/Card";
import { useAnimesByPopularity } from "../../hooks/useAnimeByPopularity";
import { Dispatch, Fragment, ReactNode, SetStateAction, useRef } from "react";
import Loader from "../Loader/Loader";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLoggedUser } from "../../hooks/useLoggedUser";
import CardPreference from "../CardPreference/CardPreference";

const List = ({ children }: { children: ReactNode }) => {
	const listRef = useRef<HTMLDivElement>(null);

	const handleScrollLeft = () => {
		if (listRef && listRef.current) {
			listRef.current.scrollLeft += listRef.current.clientWidth;
		}
	};

	const handleScrollRight = () => {
		if (listRef && listRef.current) {
			listRef.current.scrollLeft -= listRef.current.clientWidth;
		}
	};

	return (
		<div className="relative">
			<span
				className="absolute top-2/4 -translate-y-2/4 left-0 bg-gradient-blue z-10 rounded-full cursor-pointer"
				onClick={handleScrollRight}
			>
				<ChevronLeftIcon className="!text-3xl" />
			</span>
			<div
				className="flex overflow-x-auto scrollbar-hide gap-3 scroll-smooth h-[300px]"
				ref={listRef}
			>
				{children}
			</div>
			<span
				className="absolute top-2/4 -translate-y-2/4 right-0 bg-gradient-blue z-10 rounded-full cursor-pointer"
				onClick={handleScrollLeft}
			>
				<ChevronRightIcon className="!text-3xl" />
			</span>
		</div>
	);
};

export default function Profile({
	setOpenProfile,
}: {
	setOpenProfile: Dispatch<SetStateAction<boolean>>;
}) {
	const { data: me } = useLoggedUser();
	const { data: popularAnime } = useAnimesByPopularity();

	return (
		<div className="p-8">
			{me && (
				<>
					<div className="flex gap-4 items-center">
						<Avatar className="!w-16 !h-16">
							{me?.username[0]}
						</Avatar>
						<h2 className="font-semibold text-lg md:text-2xl">
							{me?.username}
						</h2>
					</div>
					<div className="py-8">
						<Accordion
							className="text-white dark:!bg-primary"
							defaultExpanded
						>
							<AccordionSummary
								expandIcon={
									<ExpandMoreIcon className="!text-white" />
								}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className="!font-semibold !text-lg md:!text-xl">
									Plan to watch
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<div className="flex gap-2 flex-wrap justify-between">
									{popularAnime ? (
										popularAnime.pages.map(
											(page, index) => (
												<Fragment key={index}>
													{page.media
														.slice(0, 20)
														.map((anime) => (
															<CardPreference
																key={anime.id}
																data={anime}
																setOpenProfile={
																	setOpenProfile
																}
															/>
														))}
												</Fragment>
											)
										)
									) : (
										<Loader
											bgLight="bg-white"
											bgDark="bg-primary"
										/>
									)}
								</div>
							</AccordionDetails>
						</Accordion>
						<Accordion
							className="text-white dark:!bg-primary"
							defaultExpanded
						>
							<AccordionSummary
								expandIcon={
									<ExpandMoreIcon className="!text-white" />
								}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className="!font-semibold !text-lg md:!text-xl">
									Watching
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<List>
									{popularAnime ? (
										popularAnime.pages.map(
											(page, index) => (
												<Fragment key={index}>
													{page.media
														.slice(0, 20)
														.map((anime) => (
															<Card
																key={anime.id}
																data={anime}
															/>
														))}
												</Fragment>
											)
										)
									) : (
										<Loader
											bgLight="bg-white"
											bgDark="bg-primary"
										/>
									)}
								</List>
							</AccordionDetails>
						</Accordion>
						<Accordion
							className="text-white dark:!bg-primary"
							defaultExpanded
						>
							<AccordionSummary
								expandIcon={
									<ExpandMoreIcon className="!text-white" />
								}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className="!font-semibold !text-lg md:!text-xl">
									Finished
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<List>
									{popularAnime ? (
										popularAnime.pages.map(
											(page, index) => (
												<Fragment key={index}>
													{page.media
														.slice(0, 20)
														.map((anime) => (
															<Card
																key={anime.id}
																data={anime}
															/>
														))}
												</Fragment>
											)
										)
									) : (
										<Loader
											bgLight="bg-white"
											bgDark="bg-primary"
										/>
									)}
								</List>
							</AccordionDetails>
						</Accordion>
						<Accordion
							className="text-white dark:!bg-primary"
							defaultExpanded
						>
							<AccordionSummary
								expandIcon={
									<ExpandMoreIcon className="!text-white" />
								}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className="!font-semibold !text-lg md:!text-xl">
									Droped
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<List>
									{popularAnime ? (
										popularAnime.pages.map(
											(page, index) => (
												<Fragment key={index}>
													{page.media
														.slice(0, 20)
														.map((anime) => (
															<Card
																key={anime.id}
																data={anime}
															/>
														))}
												</Fragment>
											)
										)
									) : (
										<Loader
											bgLight="bg-white"
											bgDark="bg-primary"
										/>
									)}
								</List>
							</AccordionDetails>
						</Accordion>
					</div>
				</>
			)}
		</div>
	);
}
