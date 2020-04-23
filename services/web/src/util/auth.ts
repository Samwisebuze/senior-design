export const isBrowser = () => typeof window !== "undefined";

interface User {
  username?: string;
  id?: string;
  token?: string;
}

export const getUser = (): User | null => {
  if (!isBrowser()) {
    return null;
  }
  const gatsbyUser = window.localStorage.getItem("gatsbyUser");
  return gatsbyUser ? JSON.parse(gatsbyUser) : null;
};

const setUser = (user: User) =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user));

export const handleLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch("http://localhost:4000/api/v1/authenticate", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(
      "Login Failed. Response came back with code other than 200"
    );
  }

  const data = await response.json();

  console.log("Login Response", data);

  return setUser({
    username: data.username,
    id: data._id,
    token: data.token,
  });
};

export const handleSignup = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch("http://localhost:4000/api/v1/register", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();

  if (data.errors) {
    console.error("Error Signing Up", data);
    throw data.errors[0].msg;
  }

  console.log("Signup Successful", data);

  return setUser({
    username: data.username,
    id: data._id,
    token: data.token,
  });
};

export const isLoggedIn = () => {
  const user = getUser();
  if (!user) {
    return false;
  }
  return !!user.username;
};

export const logout = (callback: Function) => {
  setUser({});
  callback();
};
