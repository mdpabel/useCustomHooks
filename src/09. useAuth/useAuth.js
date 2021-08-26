/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must use within <AuthProvider />`);
  }
  return context;
}

function useProvideAuth() {
  const { storedValue, clearValue, setValue } =
    useLocalStorage("Login-credentials");

  const [user, setUser] = useState(() => (storedValue ? true : false));

  const signIn = (credentials, cb) => {
    // Logic of sign-in
    if (
      credentials.username === storedValue.username &&
      credentials.password === storedValue.password
    ) {
      cb();
      setUser(true);
      console.log("Login-Success!");
    } else {
      console.log("Login-failed");
      setUser(false);
    }
  };

  const signOut = () => {
    // Logic of sign-out
    console.log("Hello");
    setUser(false);
    clearValue("Login-credentials");
  };

  const signUp = (credentials, cb) => {
    // Logic of sign-up
    if (
      credentials.fullName.length >= 3 &&
      credentials.username.length >= 3 &&
      credentials.password.length >= 5
    ) {
      setUser(true);
      setValue(credentials);
      cb();
    } else {
      setUser(false);
      console.log("Please provide valid credential!");
    }
  };

  const sendPasswordReset = () => {
    // Logic of password reset
  };

  const confirmPasswordReset = () => {
    // Logic of confirm password reset
  };

  useEffect(() =>
    // Logic of, is user exist or not?
    {}, []);

  return {
    user,
    signIn,
    signOut,
    signUp,
    sendPasswordReset,
    confirmPasswordReset,
  };
}

export { useAuth, AuthProvider };
