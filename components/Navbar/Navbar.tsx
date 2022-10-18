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

interface NavbarProps {
	open: boolean;
}

export default function Navbar({ open }: NavbarProps) {
	return (
		<nav
			className={`absolute top-full h-screen overflow-hidden bg-slate-200 dark:bg-secondary transition-all ${
				open ? "w-[70px]" : "w-0"
			}`}
		>
			<div className="w-[70px] overflow-hidden">
				<ul className="p-2">
					<NavLink pathname="/">
						<HomeIcon className="!text-3xl !text-primary" />
					</NavLink>
				</ul>
			</div>
		</nav>
	);
}
