import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { NavigationMenu } from "../components/navigation/navigation.menu";
import "../styles/globals.css";
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
        <meta name="application-name" content="Fritz-UI" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fritz-UI" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="beautiful, fast and modern UI for your FritzBox"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000" />
        <meta name="msapplication-TileColor" content="#000" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <SessionProvider session={session}>
        <main className="min-h-screen text-white antialiased">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
        <div className="background fixed inset-0 -z-10" />
      </SessionProvider>
      {process.env.NODE_ENV !== "production" && <Breakpoints />}
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
  }, [router, status]);
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
