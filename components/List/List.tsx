import Link from "next/link";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import GradientBorder from "../GradientBorder/GradientBorder";

interface Props {
	children: ReactNode;
	title: string;
	url: string;
}

export default function List({ children, title, url }: Props) {
	const [scrollPos, setScrollPos] = useState(0);
	const [scrollState, setScrollState] = useState<{
		start: number;
		end: number;
	}>({ start: 0, end: 0 });

	const listRef = useRef<HTMLDivElement>(null);

	const handleScrollLeft = useCallback(() => {
		if (listRef && listRef.current) {
			listRef.current.scrollLeft += listRef.current.clientWidth;
		}
	}, [listRef]);

	const handleScrollRight = () => {
		if (listRef && listRef.current) {
			listRef.current.scrollLeft -= listRef.current.clientWidth;
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			if (listRef && listRef.current) {
				setScrollPos(
					listRef.current.scrollLeft + listRef.current.clientWidth
				);
			}
		};

		const handleMouseDown = (e: MouseEvent) => {
			setScrollState({ ...scrollState, start: e.clientX });
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (e.clientX < scrollState.start) {
				setScrollPos(scrollPos + (scrollState.start - e.clientX));
			} else if (e.clientX > scrollState.start) {
				setScrollPos(scrollPos - (e.clientX - scrollState.start));
			}
		};

		const handleMouseUp = (e: MouseEvent) => {
			console.log(e.target);
		};

		if (listRef && listRef.current) {
			listRef.current.addEventListener("scroll", handleScroll);
			listRef.current.addEventListener("mousedown", handleMouseDown);
			listRef.current.addEventListener("mousemove", handleMouseMove);
			listRef.current.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			if (listRef && listRef.current) {
				listRef.current.removeEventListener("scroll", handleScroll);
				listRef.current.removeEventListener(
					"mousedown",
					handleMouseDown
				);
				listRef.current.removeEventListener(
					"mousemove",
					handleMouseMove
				);
				listRef.current.removeEventListener("mouseup", handleMouseUp);
			}
		};
	}, [listRef]);

	return (
		<div className="pr-3">
			<h2 className="flex items-center text-2xl font-bold py-4 uppercase">
				{title}
				<span className="ml-auto">
					<IconButton
						onClick={handleScrollRight}
						disabled={listRef?.current?.scrollLeft === 0}
						className="!shadow-none disabled:!opacity-50"
					>
						<ChevronLeftIcon className="dark:!text-white" />
					</IconButton>
					<IconButton
						onClick={handleScrollLeft}
						disabled={
							scrollPos >= Number(listRef?.current?.scrollWidth)
						}
						className="!shadow-none disabled:!opacity-50"
					>
						<ChevronRightIcon className="dark:!text-white" />
					</IconButton>
				</span>
			</h2>
			<div
				className="flex overflow-x-auto scrollbar-hide space-x-3 scroll-smooth h-[300px]"
				ref={listRef}
			>
				{children}
			</div>
			<div className="relative flex justify-center mt-4">
				<span className="absolute h-[1px] w-full bg-[#ddd] dark:bg-light-gray top-2/4 -translate-y-2/4 -z-10"></span>
				<div className="bg-white dark:bg-primary px-4 min-w-[100px] w-1/6">
					<GradientBorder>
						<Link href={url}>
							<a className="block uppercase rounded-sm transition-colors shadow-sm w-full p-2 text-center text-xs custom-link-gradient bg-white dark:bg-primary py-3 font-semibold">
								More
							</a>
						</Link>
					</GradientBorder>
				</div>
			</div>
		</div>
	);
}
