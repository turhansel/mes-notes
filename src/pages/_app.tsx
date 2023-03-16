import "@/styles/globals.css";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import { Inter } from "@next/font/google";
import { api } from "@/lib/utils/api";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <RWBProvider>
        <main
          className={`${inter.variable} h-screen overflow-hidden font-sans `}
        >
          <Component {...pageProps} />
        </main>
      </RWBProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
