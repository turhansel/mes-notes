import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter } from "@next/font/google";
import "@/styles/globals.css";
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
        <main className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
