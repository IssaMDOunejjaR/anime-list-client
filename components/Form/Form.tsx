import {
	DetailedHTMLProps,
	HTMLAttributes,
	InputHTMLAttributes,
	ReactNode,
} from "react";
import GradientBorder from "../GradientBorder/GradientBorder";

export default function Form({
	children,
	...restOfProps
}: {
	children: ReactNode;
} & DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
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

Form.Input = function FormInput({
	isError = false,
	errorMsg,
	...restOfProps
}: { isError?: boolean; errorMsg?: string } & DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>) {
	return (
		<div>
			<div className="relative">
				<input
					className={`custom-input text-black dark:bg-secondary dark:text-white`}
					{...restOfProps}
				/>
				<span
					className={`absolute ${
						isError ? "w-full" : "w-0"
					} transition-all left-0 bottom-0 h-[1px] bg-red-500`}
				></span>
			</div>
			{isError && (
				<div className={`text-xs text-red-500 p-1`}>{errorMsg}</div>
			)}
		</div>
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
				type="submit"
				className="custom-button-gradient bg-white w-full dark:bg-primary dark:text-white"
				{...restOfProps}
			>
				{children}
			</button>
		</GradientBorder>
	);
};

Form.Error = function FormError({
	message,
	...restOfProps
}: {
	message: string;
}) {
	return (
		<div
			className="bg-red-500 text-center p-2 text-white font-semibold"
			{...restOfProps}
		>
			{message}
		</div>
	);
};
