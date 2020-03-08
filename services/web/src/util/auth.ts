export const isBrowser = () => typeof window !== "undefined";

interface User {
  username?: string;
  name?: string;
  email?: string;
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

export const handleLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  if (username === `john` && password === `pass`) {
    return setUser({
      username: `john`,
      name: `Johnny`,
      email: `johnny@example.org`,
    });
  }

  return false;
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
