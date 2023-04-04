import "../styles/globals.css";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";

import { AuthRedirect } from "@/components";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthRedirect>
        <Component {...pageProps} />
      </AuthRedirect>
    </QueryClientProvider>
  );
};

export default MyApp;
