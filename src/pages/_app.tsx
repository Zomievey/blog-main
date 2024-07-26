import { AuthProvider, useAuth } from "../hooks/useAuth";
import "../app/globals.css";
import { ComponentType, useEffect } from "react";
import { useRouter } from "next/router";

const publicRoutes = ["/signup", "/login"];

function AuthChecker({
  Component,
  pageProps,
}: {
  Component: ComponentType<unknown>;
  pageProps: object;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user && !publicRoutes.includes(router.pathname)) {
        router.push("/login");
      } else if (
        user &&
        (router.pathname === "/login" || router.pathname === "/signup")
      ) {
        router.push("/");
      }
    }
  }, [user, loading, router]);

  return <Component {...pageProps} />;
}

function MyApp({
  Component,
  pageProps,
}: {
  Component: ComponentType<unknown>;
  pageProps: object;
}) {
  return (
    <AuthProvider>
      <AuthChecker Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
