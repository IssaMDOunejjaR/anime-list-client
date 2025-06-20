import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Checkbox,
	FormControlLabel,
	Typography,
} from '@mui/material';
import { useGenres } from '../hooks/useGenres';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Fragment, useEffect, useReducer, useState } from 'react';
import { useTags } from '../hooks/useTags';
import SelectBox from '../components/Select/SelectBox';
import { useAdvancedSearchedMedia } from '../hooks/useAdvancedSearchedMedia';
import Card, { CardSkeleton } from '../components/Card/Card';
import { useDebounce } from '../hooks/useDebounce';
import Head from 'next/head';
import ScrollTop from '../components/ScrollTop/ScrollTop';

enum AnimeSeason {
	WINTER = 'WINTER',
	SPRING = 'SPRING',
	SUMMER = 'SUMMER',
	FALL = 'FALL',
}

enum AnimeFormat {
	TV = 'TV',
	MOVIE = 'MOVIE',
	TV_SHORT = 'TV_SHORT',
	SPECIAL = 'SPECIAL',
	OVA = 'OVA',
	ONA = 'ONA',
	MUSIC = 'MUSIC',
}

export type SearchOptions = {
	genres: string[];
	tags: string[];
	year: number | null;
	season: string | null;
	format: string | null;
	sort: 'POPULARITY_DESC' | 'TRENDING_DESC' | 'TITLE_ROMAJI';
};

type SearchAction =
	| {
			type: 'SET_GENRE';
			payload: string;
	  }
	| {
			type: 'DELETE_GENRE';
			payload: string;
	  }
	| {
			type: 'SET_TAG';
			payload: string;
	  }
	| {
			type: 'DELETE_TAG';
			payload: string;
	  }
	| {
			type: 'SET_YEAR';
			payload: number;
	  }
	| {
			type: 'SET_ANIME_SEASON';
			payload: string;
	  }
	| {
			type: 'SET_ANIME_FORMAT';
			payload: string;
	  }
	| {
			type: 'SET_SORT';
			payload: 'POPULARITY_DESC' | 'TRENDING_DESC' | 'TITLE_ROMAJI';
	  };

const initialState: SearchOptions = {
	genres: new Array<string>(0),
	tags: new Array<string>(0),
	year: null,
	season: null,
	format: null,
	sort: 'TITLE_ROMAJI',
};

const reducer = (state: SearchOptions, action: SearchAction) => {
	switch (action.type) {
		case 'SET_GENRE':
			return {
				...state,
				genres: [...state.genres, action.payload],
			};
		case 'DELETE_GENRE':
			return {
				...state,
				genres: [
					...state.genres?.filter(
						(genre) => genre !== action.payload
					),
				],
			};
		case 'SET_TAG':
			return {
				...state,
				tags: [...state.tags, action.payload],
			};
		case 'DELETE_TAG':
			return {
				...state,
				tags: [...state.tags?.filter((tag) => tag !== action.payload)],
			};
		case 'SET_YEAR':
			return {
				...state,
				year: action.payload,
			};
		case 'SET_ANIME_SEASON':
			return {
				...state,
				season: action.payload,
			};
		case 'SET_ANIME_FORMAT':
			return {
				...state,
				format: action.payload,
			};
		case 'SET_SORT':
			return {
				...state,
				sort: action.payload,
			};
		default:
			return state;
	}
};

const years = (startYear: number) => {
	const currentYear = new Date().getFullYear() + 1;
	const years = [];

	for (let i = startYear; i <= currentYear; i++) years.push(`${i}`);

	return years;
};

export default function Search() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [searchValue, setSearchvalue] = useState('');
	const [scrollY, setScrollY] = useState(0);
	const { data: genres } = useGenres();
	const { data: tags } = useTags();

	const searchDebounceValue = useDebounce(searchValue, 1000);

	const {
		data: results,
		isFetchingNextPage,
		fetchNextPage,
	} = useAdvancedSearchedMedia(searchDebounceValue, state);

	const placeholder = [...new Array(10)].map((_, index) => (
		<CardSkeleton key={index} />
	));

	const handleSearchChange = (e: any) => {
		setSearchvalue(e.target.value);
	};

	const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked)
			dispatch({ type: 'SET_GENRE', payload: e.target.value });
		else dispatch({ type: 'DELETE_GENRE', payload: e.target.value });
	};

	const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked)
			dispatch({ type: 'SET_TAG', payload: e.target.value });
		else dispatch({ type: 'DELETE_TAG', payload: e.target.value });
	};

	const handleYearChange = (value: string) => {
		dispatch({ type: 'SET_YEAR', payload: +value });
	};

	const handleSeasonChange = (value: string) => {
		dispatch({ type: 'SET_ANIME_SEASON', payload: value });
	};

	const handleFormatChange = (value: string) => {
		dispatch({ type: 'SET_ANIME_FORMAT', payload: value });
	};

	const handleSortChange = (
		value: 'POPULARITY_DESC' | 'TRENDING_DESC' | 'TITLE_ROMAJI'
	) => {
		dispatch({ type: 'SET_SORT', payload: value });
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

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	if (!genres || !tags) return null;

	return (
		<>
			<Head>
				<title>Search</title>
			</Head>
			<div className='p-5 md:pr-8 md:p-8'>
				<div className='flex gap-3 flex-wrap w-full'>
					<div className='flex flex-col md:flex-row gap-2 w-full'>
						<input
							className='custom-input !py-3 shadow-[0_1px_1px_#aaa] dark:shadow-[0_1px_1px_#222] md:!w-2/4'
							type='text'
							placeholder='Search...'
							value={searchValue || ''}
							onChange={handleSearchChange}
						/>
						<div className='flex-1'>
							<SelectBox
								defaultValue={`${state.year}`}
								placeholder='Year'
								options={years(1940)}
								change={handleYearChange}
							/>
						</div>
						<div className='flex-1'>
							<SelectBox
								defaultValue={`${state.season}`}
								placeholder='Season'
								options={[
									AnimeSeason.WINTER,
									AnimeSeason.SPRING,
									AnimeSeason.SUMMER,
									AnimeSeason.FALL,
								]}
								change={handleSeasonChange}
							/>
						</div>
						<div className='flex-1'>
							<SelectBox
								defaultValue={`${state.format}`}
								placeholder='Format'
								options={[
									AnimeFormat.TV,
									AnimeFormat.MOVIE,
									AnimeFormat.TV_SHORT,
									AnimeFormat.SPECIAL,
									AnimeFormat.OVA,
									AnimeFormat.ONA,
									AnimeFormat.MUSIC,
								]}
								change={handleFormatChange}
							/>
						</div>
					</div>
					<div className='grid gap-2'>
						<div>
							<Accordion className='bg-slate-200 dark:!bg-secondary dark:!text-white'>
								<AccordionSummary
									expandIcon={
										<ExpandMoreIcon className='dark:!text-white' />
									}
									aria-controls='panel1a-content'
									id='panel1a-header'
								>
									<Typography>Genres</Typography>
								</AccordionSummary>
								<AccordionDetails>
									{genres
										.filter((genre) => genre !== 'Hentai')
										.map((genre, index) => (
											<FormControlLabel
												key={index}
												control={
													<Checkbox
														onChange={
															handleGenreChange
														}
														value={genre}
														className='dark:!text-white'
													/>
												}
												label={genre}
											/>
										))}
								</AccordionDetails>
							</Accordion>
						</div>
						<div>
							<Accordion className='bg-slate-200 dark:!bg-secondary dark:!text-white'>
								<AccordionSummary
									expandIcon={
										<ExpandMoreIcon className='dark:!text-white' />
									}
									aria-controls='panel1a-content'
									id='panel1a-header'
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
														onChange={
															handleTagChange
														}
														value={tag.name}
														className='dark:!text-white'
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
				<div className='py-4'>
					<h2 className='font-semibold flex items-center md:text-2xl'>
						Results for:
						<span className='ml-auto text-[9px] md:text-xs flex gap-2'>
							SORT:
							<button
								className={`${
									state.sort === 'TITLE_ROMAJI'
										? 'underline'
										: null
								} hover:underline`}
								onClick={() => handleSortChange('TITLE_ROMAJI')}
							>
								name
							</button>
							<button
								className={`${
									state.sort === 'POPULARITY_DESC'
										? 'underline'
										: null
								} hover:underline`}
								onClick={() =>
									handleSortChange('POPULARITY_DESC')
								}
							>
								popularity
							</button>
							<button
								className={`${
									state.sort === 'TRENDING_DESC'
										? 'underline'
										: null
								} hover:underline`}
								onClick={() =>
									handleSortChange('TRENDING_DESC')
								}
							>
								trending
							</button>
						</span>
					</h2>
					<div className='flex flex-wrap py-4 gap-4 justify-between'>
						{results
							? results.pages.map((page, index) => (
									<Fragment key={index}>
										{page.media.map((anime) => (
											<Card key={anime.id} data={anime} />
										))}
									</Fragment>
							  ))
							: placeholder}
						{isFetchingNextPage && placeholder}
					</div>
				</div>
			</div>
			<ScrollTop />
		</>
	);
}
