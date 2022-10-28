import { useTheme } from "next-themes";
import Select, { StylesConfig } from "react-select";

interface Props {
	placeholder: string;
	options: string[];
	defaultValue: string;
	change: (value: string) => void;
}

export default function SelectBox({
	defaultValue,
	placeholder,
	options,
	change,
}: Props) {
	const { theme } = useTheme();
	const styles: StylesConfig = {
		control: (css) => ({
			...css,
			backgroundColor: theme === "dark" ? "#1E2530" : "rgb(226 232 240)",
			boxShadow: theme === "dark" ? "0 1px 2px #222" : "0 1px 2px #aaa",
			border: "none",
			padding: 12,
		}),
		option: (css) => ({
			...css,
			backgroundColor: theme === "dark" ? "#1E2530" : "rgb(226 232 240)",
			":hover": {
				backgroundColor: theme === "dark" ? "#272C38" : "white",
			},
		}),
		menu: (css) => ({
			...css,
			backgroundColor: theme === "dark" ? "#1E2530" : "rgb(226 232 240)",
		}),
		singleValue: (css) => ({
			...css,
			color: "white",
		}),
	};

	return (
		<Select
			defaultValue={defaultValue}
			closeMenuOnSelect={true}
			options={options
				.map((opt) => ({ value: opt, label: opt }))
				.sort((a, b) => +b.value - +a.value)}
			styles={styles}
			placeholder={placeholder}
			isSearchable
			isClearable
			onChange={(e: any) => change(e ? e.value : null)}
		/>
	);
}
