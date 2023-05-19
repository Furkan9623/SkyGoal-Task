import { Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Userdetails from "../pages/Userdetails";
import PrivateRoutes from "./privateRoutes";
import { useContext } from "react";
import { spinnerContext } from "../context/MyContext";
import Spinner from "../components/Spinner";
import Home from "../pages/Home";
import Skygoal from "../pages/Skygoal";

const AllRoutes = () => {
  const { isLoading } = useContext(spinnerContext);
  console.log(isLoading);
  return (
    <>
      <Routes>
        <Route path="/" element={isLoading ? <Spinner /> : <Home />} />
        <Route
          path="/sky"
          element={isLoading ? <Spinner /> : <PrivateRoutes Comp={Skygoal} />}
        />
        <Route
          path="/register"
          element={isLoading ? <Spinner /> : <Signup />}
        />
        <Route path="/login" element={isLoading ? <Spinner /> : <Login />} />
        <Route
          path="/user-details"
          element={
            isLoading ? <Spinner /> : <PrivateRoutes Comp={Userdetails} />
          }
        />
      </Routes>
    </>
  );
};
export default AllRoutes;
