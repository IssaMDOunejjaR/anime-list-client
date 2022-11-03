import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Dispatch, ReactNode, SetStateAction, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLoggedUser } from "../../hooks/useLoggedUser";
import CardPreference from "../CardPreference/CardPreference";
import Settings from "../Settings/Settings";
import { PreferenceStatus } from "../../types/user";

export default function Profile({
	setOpenProfile,
}: {
	setOpenProfile: Dispatch<SetStateAction<boolean>>;
}) {
	const { data: me } = useLoggedUser();

	const [openSettings, setOpenSettings] = useState(false);

	if (!me) return null;

	const planToWatch = me.animePreferences.filter(
		(anime) => anime.status === PreferenceStatus.PLAN_TO_WATCH
	);
	const watching = me.animePreferences.filter(
		(anime) => anime.status === PreferenceStatus.WATCHING
	);
	const dropped = me.animePreferences.filter(
		(anime) => anime.status === PreferenceStatus.DROPPED
	);
	const finished = me.animePreferences.filter(
		(anime) => anime.status === PreferenceStatus.FINISHED
	);

	return (
		<>
			<div className="p-8">
				{me && (
					<>
						<div className="flex gap-4 items-center">
							<button
								className="shadow-none"
								onClick={() => setOpenSettings(true)}
							>
								<Avatar
									className="!w-16 !h-16"
									src={me?.avatar}
									alt={me?.username}
								>
									{me?.username[0]}
								</Avatar>
							</button>
							<h2 className="font-semibold text-lg md:text-2xl">
								{me?.username}
							</h2>
						</div>
						<div className="py-8">
							<Accordion className="dark:!text-white dark:!bg-primary">
								<AccordionSummary
									expandIcon={
										<ExpandMoreIcon className="!text-white" />
									}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className="!font-semibold !text-lg md:!text-xl">
										Favorites
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<div className="flex gap-4 flex-wrap">
										{me.favorites.map((anime) => (
											<CardPreference
												key={anime.id}
												animeId={anime.animeId}
												setOpenProfile={setOpenProfile}
											/>
										))}
									</div>
								</AccordionDetails>
							</Accordion>
							<Accordion className="dark:!text-white dark:!bg-primary">
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
									<div className="flex gap-4 flex-wrap">
										{planToWatch.map((anime) => (
											<CardPreference
												key={anime.id}
												animeId={anime.animeId}
												setOpenProfile={setOpenProfile}
											/>
										))}
									</div>
								</AccordionDetails>
							</Accordion>
							<Accordion className="dark:!text-white dark:!bg-primary">
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
									<div className="flex gap-4 flex-wrap">
										{watching.map((anime) => (
											<CardPreference
												key={anime.id}
												animeId={anime.animeId}
												setOpenProfile={setOpenProfile}
											/>
										))}
									</div>
								</AccordionDetails>
							</Accordion>
							<Accordion className="dark:!text-white dark:!bg-primary">
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
									<div className="flex gap-4 flex-wrap">
										{finished.map((anime) => (
											<CardPreference
												key={anime.id}
												animeId={anime.animeId}
												setOpenProfile={setOpenProfile}
											/>
										))}
									</div>
								</AccordionDetails>
							</Accordion>
							<Accordion className="dark:!text-white dark:!bg-primary">
								<AccordionSummary
									expandIcon={
										<ExpandMoreIcon className="!text-white" />
									}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className="!font-semibold !text-lg md:!text-xl">
										Dropped
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<div className="flex gap-4 flex-wrap">
										{dropped.map((anime) => (
											<CardPreference
												key={anime.id}
												animeId={anime.animeId}
												setOpenProfile={setOpenProfile}
											/>
										))}
									</div>
								</AccordionDetails>
							</Accordion>
						</div>
					</>
				)}
			</div>
			<Settings open={openSettings} setOpen={setOpenSettings} />
		</>
	);
}
