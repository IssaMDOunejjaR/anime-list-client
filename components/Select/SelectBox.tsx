import Select, { StylesConfig } from "react-select";

interface Props {
	placeholder: string;
	options: string[];
}

export default function SelectBox({ placeholder, options }: Props) {
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
			closeMenuOnSelect={false}
			options={options.map((opt) => ({ value: opt, label: opt }))}
			styles={styles}
			placeholder={placeholder}
		/>
	);
}
