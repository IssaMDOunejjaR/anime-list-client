import Link from "next/link";
import { ReactNode, useEffect, useRef } from "react";
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
	const listRef = useRef<HTMLDivElement>(null);

	const handleScrollLeft = () => {
		if (listRef && listRef.current) {
			listRef.current.scrollLeft += listRef.current.clientWidth;
		}
	};

	const handleScrollRight = () => {
		if (listRef && listRef.current) {
			listRef.current.scrollLeft -= listRef.current.clientWidth;
		}
	};

	return (
		<div className="pr-3">
			<h2 className="flex items-center text-2xl font-bold py-4 uppercase">
				{title}
				<span className="ml-auto">
					<IconButton onClick={handleScrollRight}>
						<ChevronLeftIcon className="!text-white" />
					</IconButton>
					<IconButton onClick={handleScrollLeft}>
						<ChevronRightIcon className="!text-white" />
					</IconButton>
				</span>
			</h2>
			<div
				className="flex overflow-hidden space-x-3 scroll-smooth min-h-[250px]"
				ref={listRef}
			>
				{children}
			</div>
			<div className="relative flex justify-center mt-4">
				<span className="absolute h-[1px] w-full bg-light-gray top-2/4 -translate-y-2/4 -z-10"></span>
				<div className="bg-white dark:bg-primary px-4 min-w-[100px] w-1/6">
					<GradientBorder>
						<Link href={url}>
							<a className="custom-link-gradient bg-white dark:bg-primary py-3 font-semibold">
								More
							</a>
						</Link>
					</GradientBorder>
				</div>
			</div>
		</div>
	);
}
