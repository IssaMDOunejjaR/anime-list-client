import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Header from "../components/Header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import { useEffect, useState } from "react";
import Profile from "../components/Profile/Profile";

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();

	const [openProfile, setOpenProfile] = useState(false);

	useEffect(() => {
		if (openProfile) {
			document.body.style.height = "100vh";
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.height = "auto";
			document.body.style.overflow = "auto";
		}
	}, [openProfile]);

	return (
		<>
			<Head>
				<link
					rel="icon"
					type="image/png"
					sizes="310x310"
					href="/logo_icon.png"
				/>
			</Head>
			<ThemeProvider attribute="class">
				<QueryClientProvider client={queryClient}>
					<Header
						openProfile={openProfile}
						setOpenProfile={setOpenProfile}
					/>
					<div className="flex">
						<div
							className={`relative transition-all duration-500 ${
								openProfile ? "w-0 lg:w-2/4" : "w-full"
							}`}
						>
							<div
								className={`absolute w-full h-full z-50 bg-[#111] transition-all duration-500 ${
									openProfile
										? "opacity-50"
										: "opacity-0 -z-50"
								}`}
								onClick={() => setOpenProfile(false)}
							></div>
							<div
								className={`overflow-hidden transition-all duration-500 origin-top ${
									openProfile
										? "-translate-x-[100px] translate-y-[100px] scale-[.9]"
										: null
								}`}
							>
								<Component {...pageProps} />
							</div>
						</div>
						<div
							className={`transition-all scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-gray-600 duration-500 sticky top-[65px] right-0 h-[calc(100vh-65px)] overflow-y-auto ${
								openProfile ? "w-full lg:w-2/4" : "w-0"
							} bg-slate-200 dark:bg-secondary`}
						>
							<Profile />
						</div>
					</div>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
