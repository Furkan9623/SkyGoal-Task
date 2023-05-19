import Input from "../components/Input";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../services/user-api";
import "../css/login-signup.css";
import { isAuthLogin, spinnerContext } from "../context/MyContext";
const initObj = {
  email: "",
  password: "",
};
const Login = () => {
  const [inputData, setInputData] = useState(initObj);
  const { setIsAuth } = useContext(isAuthLogin);
  const { loadingStatus } = useContext(spinnerContext);
  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const redirect = useNavigate();
  const formSubmit = async (e) => {
    e.preventDefault();
    const result = await LOGIN_USER(inputData);
    if (result.status === 200) {
      localStorage.setItem("skyGoalToken", result.data.token);
      setIsAuth(true);
      alert("user login successfull");
      loadingStatus();
      redirect("/user-details");
    } else {
      alert(result.response.data.message);
    }
    console.log(result);
  };
  return (
    <div id="user-form">
      <h1>LOGIN USER</h1>
      <form onSubmit={formSubmit}>
        <Input
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          placeholder="Enter password"
          name="password"
          onChange={handleInputChange}
        />

        <Input type="submit" value="LOGIN USER" />
      </form>
      <p>
        Create an Account <Link to={"/register"}>Click Here</Link>
      </p>
    </div>
  );
};
export default Login;
