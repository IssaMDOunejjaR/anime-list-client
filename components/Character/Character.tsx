interface CharacterProps {
	data: {
		name: {
			full: string;
			native: string;
		};
		image: {
			large: string;
		};
		primaryOccupations?: string[];
	};
}

export default function Character({ data }: CharacterProps) {
	return (
		<div className="flex w-full lg:w-[48%]">
			<img
				src={data.image.large}
				alt={data.name.full}
				className="w-[100px]"
			/>
			<div className="p-3 bg-slate-200 dark:bg-secondary w-full flex flex-col">
				<h4 className="text-sm md:text-md font-semibold">
					{data.name.full}
				</h4>
				<p className="text-xs text-primary">{data.name.native}</p>
				<div className="text-xs text-primary mt-auto flex gap-3 flex-wrap">
					{data.primaryOccupations?.map((occup) => (
						<span>{occup}</span>
					))}
				</div>
			</div>
		</div>
	);
}
