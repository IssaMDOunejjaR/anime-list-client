import { useEffect, useRef, useState } from "react";

export default function Card() {
	const [windowSize, setWindowSize] = useState(0);
	const [cardPosition, setCardPosition] = useState(0);
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setWindowSize(window.innerWidth);

		if (cardRef && cardRef.current) {
			setCardPosition(cardRef.current.offsetLeft);
		}

		const handleResize = () => {
			setWindowSize(window.innerWidth);

			if (cardRef && cardRef.current) {
				setCardPosition(cardRef.current.offsetLeft);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [cardRef]);

	return (
		<div
			ref={cardRef}
			className=" basis-[170px] flex-shrink-0 flex-grow-0 group relative"
		>
			<div>
				<img
					src="https://cdn.myanimelist.net/r/320x440/images/anime/1228/125011.webp?s=3f3c8911b02f22c7a04caf7b0bb65568"
					alt=""
					className="shadow-md"
				/>
			</div>
			<div className="p-2">
				<h3 className="font-semibold">Mob Psycho 100</h3>
				<p className="text-primary text-xs">TMS Entertainment</p>
			</div>
			<div
				className={`hidden group-hover:flex absolute h-full top-0 ${
					cardPosition > windowSize / 2 ? "right-full" : "left-full"
				} z-10  w-[250px] px-3 text-black`}
			>
				<div className="bg-slate-200 dark:bg-white p-3 flex flex-col w-full relative shadow-md">
					<span
						className={`absolute top-2 ${
							cardPosition > windowSize / 2
								? "left-full border-l-slate-200 dark:border-l-white"
								: "right-full border-r-slate-200 dark:border-r-white"
						} border-8 border-transparent z-20`}
					></span>
					<h3 className="font-semibold mb-2">Mob Psycho 100</h3>
					<p className="text-xs text-primary mb-3 overflow-hidden max-h-32 text-ellipsis">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Officia repellendus tenetur doloremque tempora porro
						enim, accusamus eveniet unde quae temporibus, earum
						minus ex velit nihil natus, reiciendis iure. Debitis,
						libero!.Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Officia repellendus tenetur doloremque
						tempora porro enim, accusamus eveniet unde quae
						temporibus, earum minus ex velit nihil natus, reiciendis
						iure. Debitis, libero!.
					</p>
					<div className="flex flex-wrap justify-center mt-auto p-2">
						<span className="text-[10px] px-1">Action</span>
						<span className="text-[10px] px-1">Adventure</span>
						<span className="text-[10px] px-1">Fantasy</span>
						<span className="text-[10px] px-1">Sport</span>
						<span className="text-[10px] px-1">Fantasy</span>
						<span className="text-[10px] px-1">Adventure</span>
					</div>
					<a href="#" className="custom-link">
						More
					</a>
				</div>
			</div>
		</div>
	);
}
