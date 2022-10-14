import Link from "next/link";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	title: string;
}

export default function List({ children, title }: Props) {
	return (
		<div className="px-6 py-4">
			<h2 className="text-2xl font-bold py-4">{title}</h2>
			<div className="flex space-x-4">{children}</div>
			<div className="relative flex justify-center">
				<span className="absolute h-[1px] w-full bg-light-gray top-2/4 -translate-y-2/4 -z-10"></span>
				<Link href="/popular">
					<a className="custom-link w-fit py-3 px-8 outline-8">
						More
					</a>
				</Link>
			</div>
		</div>
	);
}
