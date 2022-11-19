import { type NextPage } from "next";
import Head from "next/head";
import { Button } from "../components/Button";
import { useLogoutMutation } from "../services/hooks";

const Home: NextPage = () => {
  const { mutate: logout } = useLogoutMutation();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Head>
        <title>Todolist</title>
        <meta name="description" content="Incubator todolist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Todolist</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <main>Hello</main>
    </>
  );
};

export default Home;
