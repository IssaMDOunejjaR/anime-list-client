interface Props {
	bgLight: string;
	bgDark: string;
}

export default function Loader({ bgLight, bgDark }: Props) {
	return (
		<div className="flex items-center justify-center w-full h-full relative z-[1] p-8">
			<div className="relative w-16 h-16 bg-gradient-blue bg-clip-text">
				<span className="absolute w-full h-full bg-gradient-blue -z-10 pt-1 pl-1 animate-spin rounded-full">
					<div
						className={`w-full h-full ${bgLight} dark:${bgDark} rounded-full`}
					></div>
				</span>
				<div className="text-transparent text-3xl font-extrabold w-full h-full flex items-center justify-center">
					A
				</div>
			</div>
		</div>
	);
}
