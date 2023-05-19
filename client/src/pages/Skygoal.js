import { useContext, useEffect } from "react";
import { SKY_GOAL } from "../services/user-api";
import { useNavigate } from "react-router-dom";
import { isAuthLogin } from "../context/MyContext";

const Skygoal = () => {
  const token = localStorage.getItem("skyGoalToken");
  const getUser = async () => {
    const result = await SKY_GOAL(token);
    if (result.status === 200) {
      console.log(result);
    } else {
      console.log(result.response.data.message);
    }
  };
  const { isAuth } = useContext(isAuthLogin);
  const redirect = useNavigate();
  useEffect(() => {
    if (token || isAuth) {
      getUser();
    } else {
      redirect("/login");
    }
  });
  return (
    <img
      src="welcome.gif"
      style={{ width: "80%", height: "80vh", borderRadius: "50%" }}
      alt=""
    />
  );
};

export default Skygoal;
