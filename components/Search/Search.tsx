import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../Loader/Loader";
import { useMediaSearch } from "../../hooks/useMediaSearch";
import Link from "next/link";

interface SearchProps {
	searchValue: string;
	isFocused: boolean;
}

const Search = ({ searchValue, isFocused }: SearchProps) => {
	const { data: medias } = useMediaSearch(1, searchValue, isFocused);

	return (
		<div className={`absolute top-full rounded-sm w-full`}>
			<div
				className={`bg-slate-200 dark:bg-secondary mt-1 overflow-y-auto transition-all duration-500 shadow-md scrollbar-thin scrollbar-thumb-slate-500 dark:scrollbar-thumb-gray-600 ${
					!searchValue || !isFocused ? "h-0" : "h-[380px]"
				}`}
			>
				<div className="p-2 h-full">
					{medias ? (
						medias.map((media) => (
							<Link href={`/anime/${media.id}`}>
								<div className="flex mb-1 cursor-pointer">
									<img
										src={media.coverImage.extraLarge}
										alt={media.title.romaji}
										className="max-w-[130px]"
									/>
									<div className="px-4">
										<h2 className="font-bold">
											{media.title.romaji}
										</h2>
										<span className="text-xs italic capitalize">
											{media.format?.toLowerCase()}
										</span>
									</div>
								</div>
							</Link>
						))
					) : (
						<Loader bgLight="bg-slate-200" bgDark="bg-secondary" />
					)}
				</div>
			</div>
		</div>
	);
};

export default function SearchContainer() {
	const [searchValue, setSearchValue] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	return (
		<>
			<div className="relative">
				<input
					type="text"
					placeholder="Search..."
					className="custom-input"
					value={searchValue}
					onChange={(e: any) => setSearchValue(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
				<SearchIcon className="absolute right-3 top-2/4 -translate-y-2/4 text-primary" />
			</div>
			<Search searchValue={searchValue} isFocused={isFocused} />
		</>
	);
}
