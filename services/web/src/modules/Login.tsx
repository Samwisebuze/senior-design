import React, { useState, ChangeEventHandler, FormEventHandler } from "react";
import { navigate } from "gatsby";
import { RouteComponentProps } from "@reach/router";
import { handleLogin, isLoggedIn } from "../util/auth";

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = () => {
  const [state, setState] = useState({ username: ``, password: `` });

  const handleUpdate: ChangeEventHandler<HTMLInputElement> = event => {
    setState(
      Object.assign(state, {
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    handleLogin(state);
  };

  if (isLoggedIn()) {
    navigate(`/app`);
  }

  return (
    <>
      <h1>Log in</h1>
      <form
        method="post"
        onSubmit={event => {
          handleSubmit(event);
          navigate(`/app`);
        }}
      >
        <label htmlFor="username">
          Username
          <input type="text" name="username" onChange={handleUpdate} />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" onChange={handleUpdate} />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </>
  );
};

export default Login;
