import { Link } from "react-router-dom";
import "../css/nav.css";
import { useContext } from "react";
import {
  isAuthLogin,
  profileContext,
  spinnerContext,
} from "../context/MyContext";
import Button from "./Button";
const Navbar = () => {
  const { profile } = useContext(profileContext);
  const { isAuth, setIsAuth } = useContext(isAuthLogin);
  const { loadingStatus } = useContext(spinnerContext);
  console.log(loadingStatus);
  const URL = "http://localhost:8080";
  const logoutUser = () => {
    localStorage.removeItem("skyGoalToken");
    alert("user logout successfull");
    setIsAuth(false);
  };
  return (
    <nav>
      <Link to={"/"} onClick={loadingStatus}>
        HOME
      </Link>
      <Link to={"/sky"} onClick={loadingStatus}>
        <img src="sky.jpg" alt="" className="logoImg" />
      </Link>
      <Link to={"/user-details"} onClick={loadingStatus}>
        USER DETAILS
      </Link>
      <div>
        {isAuth ? (
          <>
            <span>{profile.name}</span>
            <img src={`${URL}/upload/${profile.image}`} alt="" />
            <Button
              btnText="LOGOUT"
              onClick={() => {
                logoutUser();
                loadingStatus();
              }}
            />
          </>
        ) : (
          <>
            {" "}
            <Link to={"/login"} onClick={loadingStatus}>
              LOG IN
            </Link>
            <Link to={"/register"} onClick={loadingStatus}>
              SIGN UP
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
