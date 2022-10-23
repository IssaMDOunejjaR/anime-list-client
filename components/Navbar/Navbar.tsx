import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { ReactNode } from "react";

interface NavLinkProps {
	children: ReactNode;
	pathname: string;
}

const NavLink = ({ children, pathname }: NavLinkProps) => {
	return (
		<li className="">
			<Link href={pathname}>
				<a className="flex justify-center items-center p-4">
					{children}
				</a>
			</Link>
		</li>
	);
};

interface NavbarProps {
	open: boolean;
}

export default function Navbar({ open }: NavbarProps) {
	return (
		<nav
			className={`absolute top-full shadow-md shadow-gray-700 h-screen overflow-hidden bg-slate-200 dark:bg-secondary transition-all ${
				open ? "w-[75px]" : "w-0"
			}`}
		>
			<div className="w-[75px] overflow-hidden">
				<ul className="">
					<NavLink pathname="/">
						<HomeIcon className="!text-3xl !text-primary" />
					</NavLink>
					<NavLink pathname="/search">
						<SearchIcon className="!text-3xl !text-primary" />
					</NavLink>
				</ul>
			</div>
		</nav>
	);
}
