import Input from "../components/Input";
import "../css/login-signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { REGISTER_USER } from "../services/user-api";
import { spinnerContext } from "../context/MyContext";
const initObj = {
  name: "",
  email: "",
  password: "",
};
const Signup = () => {
  const [signupInput, setSignupInput] = useState(initObj);
  const [inputFile, setInputFile] = useState("");
  const handleInputChange = (e) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileInput = (e) => {
    setInputFile(e.target.files[0]);
  };
  // form create
  const formData = new FormData();
  formData.append("user", JSON.stringify(signupInput));
  formData.append("photo", inputFile);
  const { name, email, password } = signupInput;
  const { loadingStatus } = useContext(spinnerContext);
  const redirect = useNavigate();
  const formSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return alert("please fill all the details.");
    } else if (password.length <= 4) {
      return alert("password must be greater than 4 digit");
    }
    const result = await REGISTER_USER(formData);
    console.log(result);
    if (result.status === 200) {
      alert(`Thanks for creating Account ${result.data.user.name}`);
      redirect("/login");
      loadingStatus();
    } else {
      alert(result.response.data.message);
    }
  };
  return (
    <div id="user-form">
      <h1>REGISTER USER</h1>
      <form onSubmit={formSubmit}>
        <Input
          type="text"
          placeholder="Enter name"
          name="name"
          onChange={handleInputChange}
        />
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
        <Input type="file" onChange={handleFileInput} />
        <Input type="submit" value="REGISTER USER" />
      </form>
      <p>
        If Already Have an Account <Link to={"/login"}>Click Here</Link>
      </p>
    </div>
  );
};
export default Signup;
