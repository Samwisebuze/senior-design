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
      id: `Johnny`,
      token: `e893089j8fe9apjf3ocj8efoj839fpj83f3a`,
    });
  }

  return false;
};

export const handleSignup = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return true;
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
