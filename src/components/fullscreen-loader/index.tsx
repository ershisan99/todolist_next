import { Loader } from "../loader";

export const FullscreenLoader = () => {
  return (
    <div className={"flex h-screen items-center justify-center"}>
      <Loader />
    </div>
  );
};
