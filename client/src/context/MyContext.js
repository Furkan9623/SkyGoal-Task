import { createContext, useEffect, useState } from "react";

const profileContext = createContext(null);
const isAuthLogin = createContext(null);
const spinnerContext = createContext(null);
const MyContext = ({ children }) => {
  const [profile, setProfile] = useState({});
  const userStatus = localStorage.getItem("isLogin") === "true" ? true : false;
  const [isAuth, setIsAuth] = useState(userStatus);
  const [isLoading, setIsLoading] = useState(false);
  const loadingStatus = () => {
    setIsLoading(true);
    // console.log("logindj");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  useEffect(() => {
    localStorage.setItem("isLogin", isAuth);
  });
  return (
    <spinnerContext.Provider value={{ isLoading, setIsLoading, loadingStatus }}>
      <isAuthLogin.Provider value={{ isAuth, setIsAuth }}>
        <profileContext.Provider value={{ profile, setProfile }}>
          {children}
        </profileContext.Provider>
      </isAuthLogin.Provider>
    </spinnerContext.Provider>
  );
};
export { MyContext, profileContext, isAuthLogin, spinnerContext };
