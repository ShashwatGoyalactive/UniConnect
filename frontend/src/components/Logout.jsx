import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import makePostRequest from "../utils/postRequest";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogoutHandler = async () => {
    try {
      await makePostRequest("/users/logout", {});

      dispatch(logout());

      navigate("/login");
    } catch (error) {
      console.error("Error encountered during logout", error);
    }
  };

  return LogoutHandler;
};

export default Logout;
