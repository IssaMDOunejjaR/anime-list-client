import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import { ReactNode } from "react";

interface NavLinkProps {
	children: ReactNode;
	pathname: string;
}

const NavLink = ({ children, pathname }: NavLinkProps) => {
	return (
		<li className="w-full flex justify-center items-center">
			<Link href={pathname}>
				<a className="flex justify-center items-center">{children}</a>
			</Link>
		</li>
	);
};

export default function Navbar() {
	return (
		<nav className="sticky top-0 h-screen bg-slate-200 dark:bg-secondary w-14">
			<div className="w-full p-3.5 border-b-[1px] border-light-gray flex justify-center items-center font-extrabold text-3xl">
				A
			</div>
			<ul className="p-2">
				<NavLink pathname="/">
					<HomeIcon className="!text-3xl !text-primary" />
				</NavLink>
			</ul>
		</nav>
	);
}
