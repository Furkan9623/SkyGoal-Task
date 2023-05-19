import { useContext, useEffect } from "react";
import { isAuthLogin } from "../context/MyContext";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({ Comp }) => {
  console.log(Comp);
  const { isAuth } = useContext(isAuthLogin);

  const redirect = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      redirect("/login");
    }
  }, [isAuth]);
  return (
    <>
      <Comp />
    </>
  );
};
export default PrivateRoutes;
