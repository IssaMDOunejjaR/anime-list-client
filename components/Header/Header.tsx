import GradientBorder from "../GradientBorder/GradientBorder";
import { useTheme } from "next-themes";
import Modal from "../Modal/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import SearchContainer from "../Search/Search";
import { Avatar, FormControlLabel, IconButton, Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import { useLoggedUser } from "../../hooks/useLoggedUser";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

interface Props {
	openProfile: boolean;
	setOpenProfile: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ openProfile, setOpenProfile }: Props) {
	const { theme, setTheme, systemTheme } = useTheme();
	const router = useRouter();

	const [openNavbar, setOpenNavbar] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSignUp, setOpenSignUp] = useState(false);

	const { data: me } = useLoggedUser();

	console.log(me);

	const currentTheme = theme === "system" ? systemTheme : theme;

	const handleCloseSignIn = () => setOpenSignIn(false);
	const handleCloseSignUp = () => setOpenSignUp(false);

	const handleLogout = () => {
		Cookie.remove("token");
		router.reload();
	};

	return (
		<>
			<header className="sticky top-0 z-[99999] bg-white dark:bg-primary">
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
								<h1 className="ml-4 text-2xl md:text-3xl font-extrabold uppercase">
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
					<div className="flex space-x-4 items-center">
						<FormControlLabel
							className="!hidden md:!block"
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
						{me ? (
							<div className="flex gap-4">
								<IconButton onClick={handleLogout}>
									<LogoutIcon className="!w-6 !h-6 dark:!text-white" />
								</IconButton>
								<Avatar
									className="cursor-pointer"
									onClick={() => setOpenProfile(!openProfile)}
								>
									{me?.username[0]}
								</Avatar>
							</div>
						) : (
							<>
								<button
									className={`custom-button`}
									onClick={() => setOpenSignIn(true)}
								>
									<span className="hidden md:inline">
										Login
									</span>
									<LoginIcon className="md:!hidden" />
								</button>
								<GradientBorder>
									<button
										className={`custom-button-gradient bg-white dark:bg-primary`}
										onClick={() => setOpenSignUp(true)}
									>
										<span className="hidden md:inline">
											Register
										</span>
										<AssignmentIcon className="md:!hidden" />
									</button>
								</GradientBorder>
							</>
						)}
					</div>
				</div>
				<div className="p-4 pr-8 md:hidden">
					<div className="relative">
						<SearchContainer />
					</div>
				</div>
			</header>
			<Modal open={openSignIn} onClose={handleCloseSignIn}>
				<SignIn close={handleCloseSignIn} />
			</Modal>
			<Modal open={openSignUp} onClose={handleCloseSignUp}>
				<SignUp close={handleCloseSignIn} />
			</Modal>
		</>
	);
}
