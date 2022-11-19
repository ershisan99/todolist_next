import type { FC, ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../services/hooks";
import { Loader } from "./loader";

export const AuthRedirect: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { data: user, isLoading, isError } = useMeQuery();
  console.log(user);
  const isAuthPage = router.pathname === "/login";

  useEffect(() => {
    console.log("here");
    if (!isLoading && !user && !isAuthPage) {
      console.log("here");
      router.push("/login");
    }
  }, [user, isError, isLoading, isAuthPage, router]);

  if (isLoading || (!user && !isAuthPage)) {
    return (
      <div className={"h-screen"}>
        <Loader />
      </div>
    );
  }
  return <>{children}</>;
};
