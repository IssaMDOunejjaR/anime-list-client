import { Dialog } from "@mui/material";
import { ReactNode } from "react";

interface Props {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {
	return (
		<Dialog onClose={onClose} open={open}>
			{children}
		</Dialog>
	);
}
