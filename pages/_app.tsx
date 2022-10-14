import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Header from "../components/Header/Header";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<ThemeProvider attribute="class">
				<div className="flex">
					<Navbar />
					<div className="w-full">
						<Header />
						<Component {...pageProps} />
					</div>
				</div>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
