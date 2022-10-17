import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();

	return (
		<>
			<ThemeProvider attribute="class">
				<QueryClientProvider client={queryClient}>
					<div className="flex w-screen">
						<Navbar />
						<div className="flex-1 flex flex-col overflow-x-hidden">
							<Header />
							<div className="flex-1 overflow-x-hidden">
								<Component {...pageProps} />
							</div>
							<Footer />
						</div>
					</div>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
