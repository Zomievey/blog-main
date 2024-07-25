import { AuthProvider, useAuth } from "../hooks/useAuth";
import "../app/globals.css";
import { ComponentType, useEffect } from "react";
import { useRouter } from "next/router";

function AuthChecker({ Component, pageProps }: { Component: ComponentType<unknown>; pageProps: object; }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <Component {...pageProps} />;
}

function MyApp({ Component, pageProps }: { Component: ComponentType<unknown>; pageProps: object; }) {
  return (
    <AuthProvider>
      <AuthChecker Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
