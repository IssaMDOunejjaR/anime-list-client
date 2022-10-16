import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<ThemeProvider attribute="class">
				<div className="flex w-screen">
					<Navbar />
					<div className="flex-1">
						<Header />
						<Component {...pageProps} />
						<Footer />
					</div>
				</div>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
