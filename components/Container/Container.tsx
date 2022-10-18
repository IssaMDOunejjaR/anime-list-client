import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
	return <div className="mx-auto max-w-[1300px]">{children}</div>;
}
