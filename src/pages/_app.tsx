import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { NavigationMenu } from "../components/navigation/navigation.menu";
import "../styles/globals.css";
import "@tremor/react/dist/esm/tremor.css";
import { api } from "../utils/api";
import { Breakpoints } from "../components/utils/breakpoints";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    if (document) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Fritz-UI</title>
        <meta
          name="description"
          content="beautiful, fast and modern UI for your FritzBox"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <main className="min-h-screen text-white antialiased">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
        <div className="background fixed inset-0 -z-10" />
      </SessionProvider>
      <Breakpoints />
    </>
  );
};

const Layout = ({ children }: React.PropsWithChildren) => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated" && router.pathname !== "/auth/login") {
      void router.push("/auth/login");
    }
  }, [status]);
  return (
    <>
      {status !== "loading" &&
        (status === "authenticated" ? (
          <NavigationMenu>{children}</NavigationMenu>
        ) : (
          children
        ))}
    </>
  );
};

export default api.withTRPC(MyApp);
