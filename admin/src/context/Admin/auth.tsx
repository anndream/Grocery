import React from "react";
import { login } from "services/auth";
import { ADMIN_TOKEN_KEY } from "utils/constants";
import { isNullOrEmpty } from "utils/stringHelper";

type AuthProps = {
  isAuthenticated: boolean;
  authenticate: Function;
  signout: Function;
};

export const AuthContext = React.createContext({} as AuthProps);

const isValidToken = () => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  // JWT decode & check token validity & expiration.
  if (isNullOrEmpty(token)) return false;
  else return true;
};

const AuthProvider = (props: any) => {
  const [isAuthenticated, makeAuthenticated] = React.useState(isValidToken());

  async function authenticate({ email, password }, cb) {
    let { success, message } = await login({ email, password });
    if (success) cb();
    else alert(message);
  }

  function signout(cb) {
    makeAuthenticated(false);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setTimeout(cb, 100);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
