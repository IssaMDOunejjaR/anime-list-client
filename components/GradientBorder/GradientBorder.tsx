import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function GradientBorder({ children }: Props) {
	return (
		<div className="bg-gradient-blue p-[1px] rounded-sm shadow-sm">
			{children}
		</div>
	);
}
