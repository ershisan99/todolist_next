import React from "react";
import type { NextPage } from "next";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useLoginMutation } from "../services/hooks";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

const Login: NextPage = () => {
  const { mutateAsync: login } = useLoginMutation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = () => {
    login({
      email,
      password,
      rememberMe: remember,
    }).then(() => {
      queryClient.invalidateQueries(["me"]);
      router.push("/");
    });
  };

  return (
    <div className={"flex h-screen items-center justify-center"}>
      <div className={"flex w-52 flex-col gap-3"}>
        <label className={"flex flex-col gap-1"}>
          Email
          <Input value={email} onChange={handleEmailChange} type="email" />
        </label>

        <label className={"flex flex-col gap-1"}>
          Password
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>

        <label className={"flex items-center gap-2"}>
          <input
            type={"checkbox"}
            checked={remember}
            onChange={handleRememberChange}
          />
          Remember me
        </label>
        <Button className={"w-full"} onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
