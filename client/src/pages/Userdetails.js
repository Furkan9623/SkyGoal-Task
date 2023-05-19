import { USER_DETAILS } from "../services/user-api";
import { useContext, useEffect, useState } from "react";
import "../css/user-details.css";
import { useNavigate } from "react-router-dom";
import { isAuthLogin, profileContext } from "../context/MyContext";
const Userdetails = () => {
  const [userDetails, setUserDetails] = useState({});
  const { profile, setProfile } = useContext(profileContext);
  const { isAuth } = useContext(isAuthLogin);
  const token = localStorage.getItem("skyGoalToken");
  const getUser = async () => {
    const result = await USER_DETAILS(token);
    console.log(result);
    if (result.status === 200) {
      setUserDetails(result.data.user);
      setProfile({
        name: result.data.user.name,
        image: result.data.user.image,
      });
    } else {
      alert(result.response.data.message);
    }
  };
  const redirect = useNavigate();
  useEffect(() => {
    if (token || isAuth) {
      getUser();
    } else {
      redirect("/login");
    }
  }, [isAuth]);
  const URL = "http://localhost:8080";
  return (
    <div id="user-details">
      <h1>USER DETAILS</h1>
      <img src={`${URL}/upload/${userDetails.image}`} alt="" />
      <div>
        <div>
          <h2>NAME : </h2>
          <h4>EMAIL : </h4>
          <h5>USER ID : </h5>
        </div>
        <div>
          <h2>{userDetails.name}</h2>
          <h4>{userDetails.email}</h4>
          <h5> {userDetails.id}</h5>
        </div>
      </div>
    </div>
  );
};
export default Userdetails;
