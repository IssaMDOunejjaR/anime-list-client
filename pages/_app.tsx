import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Header from "../components/Header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Profile from "../components/Profile/Profile";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: Infinity,
				retryDelay: 65000,
			},
		},
	});

	const persister = createSyncStoragePersister({
		storage:
			typeof window !== "undefined" ? window.localStorage : undefined,
	});

	const [openProfile, setOpenProfile] = useState(false);

	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (openProfile) {
			document.body.style.height = "100vh";
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [openProfile]);

	useEffect(() => {
		if (divRef && divRef.current) {
			divRef.current.style.width = `${divRef.current.parentElement?.clientWidth}px`;
		}

		const handleResize = () => {
			if (divRef && divRef.current) {
				divRef.current.style.width = `${divRef.current.parentElement?.clientWidth}px`;
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [divRef]);

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
				{/* <QueryClientProvider client={queryClient}> */}
				<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{ persister, maxAge: 300000 }}
				>
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
								ref={divRef}
								className={`overflow-hidden transition-transform duration-500 origin-top ${
									openProfile ? "-translate-x-[49%]" : null
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
							<Profile setOpenProfile={setOpenProfile} />
						</div>
					</div>
					<ReactQueryDevtools initialIsOpen={false} />
				</PersistQueryClientProvider>
				{/* </QueryClientProvider> */}
			</ThemeProvider>
		</>
	);
}

export default MyApp;
