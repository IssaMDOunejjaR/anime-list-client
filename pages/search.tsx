import SelectBox from "../components/Select/SelectBox";
import { useGenres } from "../hooks/useGenres";

export default function Search() {
	const { data: genres } = useGenres();

	if (!genres) return null;

	return (
		<div className="p-8">
			<div className="flex gap-3 flex-wrap">
				<input
					className="custom-input"
					type="text"
					placeholder="Search..."
				/>
				<SelectBox
					options={genres
						.filter((genre) => genre !== "Hentai")
						.map((genre) => ({ value: genre, label: genre }))}
				/>
			</div>
			<div className="py-4">
				<h2 className="font-semibold md:text-xl">Search for: </h2>
			</div>
		</div>
	);
}
