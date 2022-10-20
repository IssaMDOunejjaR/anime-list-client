import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();

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
					<Header />
					<Component {...pageProps} />
					{/* <Footer /> */}
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
