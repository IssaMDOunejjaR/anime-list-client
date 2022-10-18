import GradientBorder from "../GradientBorder/GradientBorder";
import { useTheme } from "next-themes";
import Modal from "../Modal/Modal";
import { useState } from "react";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import SearchContainer from "../Search/Search";
import { FormControlLabel, IconButton, Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";

export default function Header() {
	const { theme, setTheme, systemTheme } = useTheme();

	const [openNavbar, setOpenNavbar] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSignUp, setOpenSignUp] = useState(false);

	const currentTheme = theme === "system" ? systemTheme : theme;

	const handleCloseSignIn = () => setOpenSignIn(false);
	const handleCloseSignUp = () => setOpenSignUp(false);

	return (
		<>
			<header className="sticky top-0 z-50 bg-white dark:bg-primary">
				<Navbar open={openNavbar} />
				<div className="flex justify-between items-center border-b-[1px] border-light-gray py-3 px-5 pr-8">
					<div className="flex items-center">
						<IconButton
							className="!shadow-none dark:!text-white"
							onClick={() => setOpenNavbar(!openNavbar)}
						>
							<MenuIcon />
						</IconButton>
						<Link href="/">
							<a>
								<h1 className="ml-4 text-3xl font-extrabold uppercase">
									<span className="bg-gradient-blue p-0.5 text-white">
										Ani
									</span>
									<span className="bg-gradient-blue bg-clip-text text-transparent p-0.5">
										me
									</span>
								</h1>
							</a>
						</Link>
					</div>
					<div className="w-1/3 relative hidden md:block">
						<SearchContainer />
					</div>
					<div className="flex space-x-4">
						<FormControlLabel
							value="end"
							control={
								<Switch
									size="small"
									checked={currentTheme === "dark"}
									onChange={() =>
										setTheme(
											currentTheme === "dark"
												? "light"
												: "dark"
										)
									}
								/>
							}
							label="Dark"
							labelPlacement="end"
						/>
						<button
							className={`custom-button`}
							onClick={() => setOpenSignIn(true)}
						>
							Login
						</button>
						<GradientBorder>
							<button
								className={`custom-button-gradient bg-white dark:bg-primary`}
								onClick={() => setOpenSignUp(true)}
							>
								Register
							</button>
						</GradientBorder>
					</div>
				</div>
				<div className="p-4 pr-8 md:hidden">
					<div className="relative">
						<SearchContainer />
					</div>
				</div>
			</header>
			<Modal open={openSignIn} onClose={handleCloseSignIn}>
				<SignIn />
			</Modal>
			<Modal open={openSignUp} onClose={handleCloseSignUp}>
				<SignUp />
			</Modal>
		</>
	);
}
