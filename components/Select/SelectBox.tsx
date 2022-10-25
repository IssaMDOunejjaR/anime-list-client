import { ReactNode } from "react";
import Select, { StylesConfig, components } from "react-select";

interface Props {
	options?: { value: string; label: string }[];
}

export default function SelectBox({ options }: Props) {
	const styles: StylesConfig = {
		control: (css) => ({
			...css,
			backgroundColor: "#1E2530",
			border: "none",
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
	};

	// const Control = ({ children, ...props }: { children: ReactNode }) => {
	// 	return <components.Control {...props}>{children}</components.Control>;
	// };

	return (
		<Select
			closeMenuOnSelect={false}
			isMulti
			options={options}
			styles={styles}
			placeholder="Genre"
		/>
	);
}
