import { AuthProvider, useAuth } from "../hooks/useAuth";
import "../app/globals.css";
import { ComponentType, useEffect } from "react";
import { useRouter } from "next/router";

const publicRoutes = ["/signup", "/another-public-route"];

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
    if (!loading && !user && !publicRoutes.includes(router.pathname)) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading && !user) {
    router.push("/login");
  }

  if (loading && user) {
    router.push("/");
  }

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
