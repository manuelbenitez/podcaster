import Navbar from "@/components/Navbar/Navbar";
import { store } from "@/store";
import "@/styles/globals.css";
import { StoreProvider } from "easy-peasy";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </StoreProvider>
  );
}
