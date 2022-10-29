import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { motion } from "framer-motion";

interface Props {
	value: boolean;
	change: () => void;
}

export default function DarkModeSwitch({ value, change }: Props) {
	return (
		<div
			className={`relative ${
				value ? "bg-black" : "bg-slate-400"
			} w-[50px] h-[25px] rounded-xl p-0.5 cursor-pointer`}
			onClick={change}
		>
			<span
				className={`flex transition-[all] duration-200 justify-center items-center rounded-full w-[20px] h-[20px] ${
					value ? "bg-white translate-x-[120%]" : "bg-slate-50"
				} absolute top-2/4 -translate-y-2/4`}
			>
				{value ? (
					<DarkModeIcon className="!w-[15px] !h-[15px] !text-black" />
				) : (
					<WbSunnyIcon className="!w-[15px] !h-[15px] !text-yellow-400" />
				)}
			</span>
		</div>
	);
}
