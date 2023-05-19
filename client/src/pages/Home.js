import { useContext, useEffect } from "react";
import { isAuthLogin, profileContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { USER_DETAILS } from "../services/user-api";
const Home = () => {
  const token = localStorage.getItem("skyGoalToken");
  const { setProfile } = useContext(profileContext);
  const getUser = async () => {
    const result = await USER_DETAILS(token);
    console.log(result);
    if (result.status === 200) {
      setProfile({
        name: result.data.user.name,
        image: result.data.user.image,
      });
    } else {
      alert(result.response.data.message);
    }
  };
  const { isAuth } = useContext(isAuthLogin);
  const redirect = useNavigate();
  useEffect(() => {
    if (token || isAuth) {
      getUser();
    } else {
      redirect("/");
    }
  }, [isAuth]);
  return (
    <div id="home">
      <img
        style={{ width: "100%", height: "80vh" }}
        src="https://thumbs.dreamstime.com/b/homepage-concept-scribble-keywords-icons-doodle-35696257.jpg"
        alt=""
      />
    </div>
  );
};
export default Home;
