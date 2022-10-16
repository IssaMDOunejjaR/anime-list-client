import SearchIcon from "@mui/icons-material/Search";
import GradientBorder from "../GradientBorder/GradientBorder";
import { useTheme } from "next-themes";
import Modal from "../Modal/Modal";
import { useState } from "react";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

interface SearchProps {
	searchValue: string;
}

const Search = ({ searchValue }: SearchProps) => {
	return (
		<div className={`absolute top-full rounded-sm w-full`}>
			<div
				className={`bg-slate-200 dark:bg-secondary mt-1 overflow-y-auto transition-all duration-500 shadow-md scrollbar-thin scrollbar-thumb-slate-500 dark:scrollbar-thumb-gray-600 ${
					!searchValue ? "h-0" : "h-[380px]"
				}`}
			>
				<div className="p-2">
					<div className="flex mb-1">
						<img
							src="https://cdn.myanimelist.net/r/320x440/images/anime/1228/125011.webp?s=3f3c8911b02f22c7a04caf7b0bb65568"
							alt=""
							className="w-1/3"
						/>
						<div className="px-4">
							<h2 className="font-bold">Mob Psycho 100</h2>
							<span className="text-xs italic">Tv</span>
						</div>
					</div>
					<div className="flex mb-1">
						<img
							src="https://cdn.myanimelist.net/r/320x440/images/anime/1228/125011.webp?s=3f3c8911b02f22c7a04caf7b0bb65568"
							alt=""
							className="w-1/3"
						/>
						<div className="px-4">
							<h2 className="font-bold">Mob Psycho 100</h2>
							<span className="text-xs italic">Tv</span>
						</div>
					</div>
					<div className="flex mb-1">
						<img
							src="https://cdn.myanimelist.net/r/320x440/images/anime/1228/125011.webp?s=3f3c8911b02f22c7a04caf7b0bb65568"
							alt=""
							className="w-1/3"
						/>
						<div className="px-4">
							<h2 className="font-bold">Mob Psycho 100</h2>
							<span className="text-xs italic">Tv</span>
						</div>
					</div>
					<div className="flex mb-1">
						<img
							src="https://cdn.myanimelist.net/r/320x440/images/anime/1228/125011.webp?s=3f3c8911b02f22c7a04caf7b0bb65568"
							alt=""
							className="w-1/3"
						/>
						<div className="px-4">
							<h2 className="font-bold">Mob Psycho 100</h2>
							<span className="text-xs italic">Tv</span>
						</div>
					</div>
					<div className="flex mb-1">
						<img
							src="https://cdn.myanimelist.net/r/320x440/images/anime/1228/125011.webp?s=3f3c8911b02f22c7a04caf7b0bb65568"
							alt=""
							className="w-1/3"
						/>
						<div className="px-4">
							<h2 className="font-bold">Mob Psycho 100</h2>
							<span className="text-xs italic">Tv</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function Header() {
	const { theme, setTheme, systemTheme } = useTheme();
	const [searchValue, setSearchValue] = useState("");

	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSignUp, setOpenSignUp] = useState(false);

	const currentTheme = theme === "system" ? systemTheme : theme;

	const handleCloseSignIn = () => setOpenSignIn(false);
	const handleCloseSignUp = () => setOpenSignUp(false);

	return (
		<>
			<header className="flex justify-between items-center py-3 px-5 pr-8 border-b-[1px] border-light-gray sticky top-0 z-50 bg-white dark:bg-primary">
				<h1 className="text-3xl font-extrabold uppercase">
					<span className="bg-gradient-blue p-0.5 text-white">
						Ani
					</span>
					<span className="bg-gradient-blue bg-clip-text text-transparent p-0.5">
						me
					</span>
				</h1>
				<div className="w-1/3 relative">
					<div className="relative">
						<input
							type="text"
							placeholder="Search..."
							className="custom-input"
							value={searchValue}
							onChange={(e: any) =>
								setSearchValue(e.target.value)
							}
						/>
						<SearchIcon className="absolute right-3 top-2/4 -translate-y-2/4 text-primary" />
					</div>
					<Search searchValue={searchValue} />
				</div>
				<div className="flex space-x-4">
					<button
						onClick={() =>
							setTheme(currentTheme === "dark" ? "light" : "dark")
						}
					>
						dark
					</button>
					<button
						className={`custom-button`}
						onClick={() => setOpenSignIn(true)}
					>
						Login
					</button>
					<GradientBorder>
						<button
							className={`custom-button-gradient bg-white dark:bg-primary`}
							onClick={() => setOpenSignUp(true)}
						>
							Register
						</button>
					</GradientBorder>
				</div>
			</header>
			<Modal open={openSignIn} onClose={handleCloseSignIn}>
				<SignIn />
			</Modal>
			<Modal open={openSignUp} onClose={handleCloseSignUp}>
				<SignUp />
			</Modal>
		</>
	);
}
