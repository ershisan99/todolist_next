import { type AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthRedirect } from "../components/AuthRedirect";

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
