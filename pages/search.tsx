import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Checkbox,
	FormControlLabel,
	Typography,
} from "@mui/material";
import { useGenres } from "../hooks/useGenres";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Fragment, useEffect, useReducer, useState } from "react";
import { useTags } from "../hooks/useTags";
import SelectBox from "../components/Select/SelectBox";
import { useAdvancedSearchedMedia } from "../hooks/useAdvancedSearchedMedia";
import Loader from "../components/Loader/Loader";
import Card from "../components/Card/Card";

enum AnimeSeason {
	WINTER = "WINTER",
	SPRING = "SPRING",
	SUMMER = "SUMMER",
	FALL = "FALL",
}

enum AnimeFormat {
	TV = "TV",
	MOVIE = "MOVIE",
	TV_SHORT = "TV_SHORT",
	SPECIAL = "SPECIAL",
	OVA = "OVA",
	ONA = "ONA",
	MUSIC = "MUSIC",
}

export type SearchOptions = {
	searchValue: string | null;
	genres: string[] | null;
	tags: string[] | null;
	year: number | null;
	season: AnimeSeason | null;
	format: AnimeFormat | null;
};

type SearchAction =
	| {
			type: "SET_SEARCH_VALUE";
			payload: string;
	  }
	| {
			type: "SET_GENRE";
			payload: string;
	  }
	| {
			type: "SET_TAG";
			payload: string;
	  }
	| {
			type: "SET_YEAR";
			payload: number;
	  }
	| {
			type: "SET_ANIME_SEASON";
			payload: AnimeSeason;
	  }
	| {
			type: "SET_ANIME_FORMAT";
			payload: AnimeFormat;
	  };

const initialState = {
	searchValue: null,
	genres: null,
	tags: null,
	year: null,
	season: null,
	format: null,
};

const reducer = (state: SearchOptions, action: SearchAction) => {
	switch (action.type) {
		case "SET_SEARCH_VALUE":
			return {
				...state,
				searchValue: action.payload,
			};
		case "SET_GENRE":
			return {
				...state,
				genres: state.genres
					? [...state.genres, action.payload]
					: [action.payload],
			};
		case "SET_TAG":
			return {
				...state,
				tags: state.tags
					? [...state.tags, action.payload]
					: [action.payload],
			};
		default:
			return state;
	}
};

const years = (startYear: number) => {
	const currentYear = new Date().getFullYear();
	const years = [];

	for (let i = startYear; i <= currentYear; i++) years.push(`${i}`);

	return years;
};

export default function Search() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [scrollY, setScrollY] = useState(0);
	const { data: genres } = useGenres();
	const { data: tags } = useTags();
	const {
		data: results,
		isFetchingNextPage,
		fetchNextPage,
	} = useAdvancedSearchedMedia(state);

	const handleSearchChange = (e: any) => {
		dispatch({ type: "SET_SEARCH_VALUE", payload: e.target.value });
	};

	const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.checked);
		dispatch({ type: "SET_GENRE", payload: e.target.value });
	};

	const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: "SET_TAG", payload: e.target.value });
	};

	useEffect(() => {
		if (document.body.clientHeight / 2 < scrollY) {
			fetchNextPage();
		}
	}, [scrollY]);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	if (!genres || !tags) return null;

	return (
		<div className="p-4 pr-8 md:p-8">
			<div className="flex gap-3 flex-wrap w-full">
				<div className="flex flex-col md:flex-row gap-2 w-full">
					<input
						className="custom-input !py-3 shadow-md md:!w-2/4"
						type="text"
						placeholder="Search..."
						value={state.searchValue || ""}
						onChange={handleSearchChange}
					/>
					<div className="flex-1">
						<SelectBox placeholder="Year" options={years(1940)} />
					</div>
					<div className="flex-1">
						<SelectBox
							placeholder="Season"
							options={[
								AnimeSeason.WINTER,
								AnimeSeason.SPRING,
								AnimeSeason.SUMMER,
								AnimeSeason.FALL,
							]}
						/>
					</div>
					<div className="flex-1">
						<SelectBox
							placeholder="Format"
							options={[
								AnimeFormat.TV,
								AnimeFormat.MOVIE,
								AnimeFormat.TV_SHORT,
								AnimeFormat.SPECIAL,
								AnimeFormat.OVA,
								AnimeFormat.ONA,
								AnimeFormat.MUSIC,
							]}
						/>
					</div>
				</div>
				<div className="grid gap-2">
					<div>
						<Accordion className="dark:!bg-secondary dark:!text-white">
							<AccordionSummary
								expandIcon={
									<ExpandMoreIcon className="dark:!text-white" />
								}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Genres</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{genres
									.filter((genre) => genre !== "Hentai")
									.map((genre, index) => (
										<FormControlLabel
											key={index}
											control={
												<Checkbox
													onChange={handleGenreChange}
													value={genre}
													className="dark:!text-white"
												/>
											}
											label={genre}
										/>
									))}
							</AccordionDetails>
						</Accordion>
					</div>
					<div>
						<Accordion className="dark:!bg-secondary dark:!text-white">
							<AccordionSummary
								expandIcon={
									<ExpandMoreIcon className="dark:!text-white" />
								}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Tags</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{tags
									.filter((tag) => tag.isAdult === false)
									.map((tag, index) => (
										<FormControlLabel
											key={index}
											control={
												<Checkbox
													onChange={handleTagChange}
													value={tag.name}
													className="dark:!text-white"
												/>
											}
											label={tag.name}
										/>
									))}
							</AccordionDetails>
						</Accordion>
					</div>
				</div>
			</div>
			<div className="px-2 py-4">
				<h2 className="font-semibold md:text-2xl">Results for:</h2>
				<div className="flex flex-wrap py-4 gap-4">
					{results ? (
						results.pages.map((page, index) => (
							<Fragment key={index}>
								{page.media.map((anime) => (
									<Card key={anime.id} data={anime} />
								))}
							</Fragment>
						))
					) : (
						<Loader bgLight="bg-white" bgDark="bg-primary" />
					)}
					{isFetchingNextPage && (
						<Loader bgLight="bg-white" bgDark="bg-primary" />
					)}
				</div>
			</div>
		</div>
	);
}
