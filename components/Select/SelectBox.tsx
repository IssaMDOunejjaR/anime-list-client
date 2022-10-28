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
	const styles: StylesConfig = {
		control: (css) => ({
			...css,
			backgroundColor: "#1E2530",
			border: "none",
			padding: 12,
		}),
		option: (css) => ({
			...css,
			backgroundColor: "#1E2530",
			":hover": {
				backgroundColor: "#272C38",
			},
		}),
		menu: (css) => ({
			...css,
			backgroundColor: "#1E2530",
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
