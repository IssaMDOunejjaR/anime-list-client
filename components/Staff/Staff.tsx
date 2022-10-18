import { Anime } from "../../types";
import Character from "../Character/Character";

export default function Staff({ data }: { data: Anime }) {
	return (
		<div>
			<h3 className="text-lg md:text-2xl font-semibold mb-4">Staff</h3>
			<div className="flex flex-wrap gap-4">
				{data.staff.nodes.map((s) => (
					<Character data={s} />
				))}
			</div>
		</div>
	);
}
