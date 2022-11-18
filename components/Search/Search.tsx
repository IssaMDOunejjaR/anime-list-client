import { Fragment, useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../Loader/Loader';
import { useMediaSearch } from '../../hooks/useMediaSearch';
import Link from 'next/link';
import parse from 'html-react-parser';
import { useDebounce } from '../../hooks/useDebounce';
import Image from 'next/image';

interface SearchProps {
	searchValue: string;
	isFocused: boolean;
}

const Search = ({ searchValue, isFocused }: SearchProps) => {
	const [scrollY, setScrollY] = useState(0);
	const {
		data: medias,
		fetchNextPage,
		isFetchingNextPage,
	} = useMediaSearch(1, searchValue, isFocused);

	const scrollRef = useRef<HTMLDivElement>(null);
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (
			scrollRef &&
			scrollRef.current &&
			divRef &&
			divRef.current &&
			divRef.current.scrollHeight / 2 < scrollY
		) {
			fetchNextPage();
		}
	}, [scrollY, scrollRef, divRef]);

	useEffect(() => {
		const handleScroll = () => {
			if (scrollRef && scrollRef.current)
				setScrollY(scrollRef.current.scrollTop);
		};

		scrollRef?.current?.addEventListener('scroll', handleScroll);

		return () => {
			scrollRef?.current?.removeEventListener('scroll', handleScroll);
		};
	}, [scrollRef]);

	return (
		<div className={`absolute top-full rounded-sm w-full`}>
			<div
				ref={scrollRef}
				className={`bg-slate-200 dark:bg-secondary mt-1 overflow-y-auto transition-all duration-500 shadow-md scrollbar-thin scrollbar-thumb-slate-500 dark:scrollbar-thumb-gray-600 ${
					!searchValue || !isFocused ? 'h-0' : 'h-[380px]'
				}`}
			>
				<div ref={divRef} className='p-2 h-full'>
					{medias ? (
						medias.pages.map((page, index) => (
							<Fragment key={index}>
								{page.media.map((media) => (
									<Link
										key={media.id}
										href={`/anime/${media.id}`}
										prefetch={false}
									>
										<div className='relative flex mb-1 cursor-pointer h-[185px]'>
											<div className='w-[130px] h-full relative'>
												<Image
													src={
														media.coverImage
															.extraLarge
													}
													alt={media.title.romaji}
													layout='fill'
												/>
											</div>
											<div className='px-4 flex flex-col py-1 flex-1'>
												<h2 className='font-bold'>
													{media.title.romaji}
												</h2>
												<span className='text-xs italic capitalize text-[#aaa] mb-2'>
													{media.format
														?.replace('_', ' ')
														.toLowerCase()}
													{(media.episodes ||
														media.nextAiringEpisode) &&
														(media.episodes
															? ` | Episodes: ${media.episodes}`
															: ` | Last Episode: ${
																	media
																		.nextAiringEpisode
																		?.episode -
																	1
															  }`)}
												</span>
												<p className='flex-1 overflow-hidden text-xs text-ellipsis text-[#aaa] py-1'>
													{parse(
														media.description ||
															'No description'
													)}
												</p>
											</div>
										</div>
									</Link>
								))}
							</Fragment>
						))
					) : (
						<Loader bgLight='bg-slate-200' bgDark='bg-secondary' />
					)}
					{isFetchingNextPage && (
						<Loader bgLight='bg-white' bgDark='bg-primary' />
					)}
				</div>
			</div>
		</div>
	);
};

export default function SearchContainer() {
	const [searchValue, setSearchValue] = useState('');
	const [isFocused, setIsFocused] = useState(false);

	const searchDebounceValue = useDebounce(searchValue, 1000);

	return (
		<>
			<div className='relative flex-1'>
				<input
					type='text'
					placeholder='Search...'
					className='custom-input'
					value={searchValue}
					onChange={(e: any) => setSearchValue(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
				<SearchIcon className='absolute right-3 top-2/4 -translate-y-2/4 text-primary' />
			</div>
			<Search searchValue={searchDebounceValue} isFocused={isFocused} />
		</>
	);
}
