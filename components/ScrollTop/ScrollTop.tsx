import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ScrollTop() {
	const [show, setShow] = useState(false);

	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 800) {
				setShow(true);
			} else {
				setShow(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<AnimatePresence mode="wait">
			{show ? (
				<motion.div
					initial={{ x: 100 }}
					animate={{ x: 0 }}
					exit={{ x: 100 }}
					className="fixed bottom-10 right-10 bg-gradient-blue p-3 rounded-full cursor-pointer"
					onClick={handleClick}
				>
					<ExpandLessIcon className="!text-white !text-4xl" />
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}
