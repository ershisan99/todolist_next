import type { ChangeEvent } from "react";
import React, { useState } from "react";

import type { NextPage } from "next";

import { Button, Input } from "@/components";
import { useLoginMutation } from "@/services";

const Login: NextPage = () => {
  const { mutate: login } = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = () => {
    login({
      email,
      password,
      rememberMe: remember,
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
