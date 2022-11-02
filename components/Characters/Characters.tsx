import { Anime } from "../../types";
import Character from "../Character/Character";

export default function Characters({ data }: { data: Anime }) {
	return (
		<div>
			<h3 className="text-lg md:text-2xl font-semibold mb-4">
				Characters
			</h3>
			<div className="flex flex-wrap gap-4">
				{data.characters.nodes.map((character, index) => (
					<Character key={index} data={character} />
				))}
			</div>
		</div>
	);
}
