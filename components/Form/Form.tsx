import { ReactNode } from "react";
import GradientBorder from "../GradientBorder/GradientBorder";

export default function Form({
	children,
	...restOfProps
}: {
	children: ReactNode;
}) {
	return (
		<form
			className="flex flex-col space-y-4 bg-white dark:bg-primary p-8 w-[30vw] max-w-[500px] min-w-[300px]"
			{...restOfProps}
		>
			{children}
		</form>
	);
}

Form.Title = function FormTitle({
	children,
	...restOfProps
}: {
	children: ReactNode;
}) {
	return (
		<h2
			className="text-xl md:text-4xl font-extrabold text-center uppercase bg-gradient-blue bg-clip-text text-transparent mb-4"
			{...restOfProps}
		>
			{children}
		</h2>
	);
};

Form.Input = function FormInput({ ...restOfProps }) {
	return (
		<input
			className="custom-input text-black dark:bg-secondary dark:text-white"
			{...restOfProps}
		/>
	);
};

Form.Button = function FormInput({
	children,
	...restOfProps
}: {
	children: ReactNode;
}) {
	return (
		<GradientBorder>
			<button
				className="custom-button-gradient bg-white w-full dark:bg-primary dark:text-white"
				{...restOfProps}
			>
				{children}
			</button>
		</GradientBorder>
	);
};
