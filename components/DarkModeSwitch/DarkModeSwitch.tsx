import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeSwitch() {
	const { theme, setTheme, systemTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState(
		theme === "system" ? systemTheme : theme
	);

	useEffect(() => {
		setCurrentTheme(theme === "system" ? systemTheme : theme);
	}, [theme, systemTheme]);

	return (
		<div
			className={`relative ${
				currentTheme === "dark" ? "bg-black" : "bg-slate-400"
			} w-[50px] h-[25px] rounded-xl p-0.5 cursor-pointer`}
			onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
		>
			<span
				className={`flex transition-[all] duration-200 justify-center items-center rounded-full w-[20px] h-[20px] ${
					currentTheme === "dark"
						? "bg-white translate-x-[120%]"
						: "bg-slate-50"
				} absolute top-2/4 -translate-y-2/4`}
			>
				{currentTheme === "dark" ? (
					<DarkModeIcon className="!w-[15px] !h-[15px] !text-black" />
				) : (
					<WbSunnyIcon className="!w-[15px] !h-[15px] !text-yellow-400" />
				)}
			</span>
		</div>
	);
}
