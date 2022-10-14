import SearchIcon from "@mui/icons-material/Search";
import GradientBorder from "../GradientBorder/GradientBorder";
import { useTheme } from "next-themes";

export default function Header() {
	const { theme, setTheme } = useTheme();
	const buttonClass = "py-2 px-6";

	return (
		<header className="flex justify-between items-center py-3 px-5 border-b-[1px] border-light-gray sticky top-0">
			<div>LOGO</div>
			<div className="w-1/3">
				<div className="relative">
					<input
						type="text"
						placeholder="Search..."
						className="custom-input"
					/>
					<SearchIcon className="absolute right-3 top-2/4 -translate-y-2/4 text-primary" />
				</div>
			</div>
			<div className="flex space-x-4">
				<button
					onClick={() =>
						setTheme(theme === "dark" ? "light" : "dark")
					}
				>
					dark
				</button>
				<button className={`custom-button`}>Sign in</button>
				<GradientBorder>
					<button
						className={`custom-button-gradient bg-white dark:bg-primary`}
					>
						Sign up
					</button>
				</GradientBorder>
			</div>
		</header>
	);
}
