import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import makeGetRequest from "../utils/getRequest";
import makePostRequest from "../utils/postRequest";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkLogin = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken) {
                try {
                    const response = await makeGetRequest("/users/get", true);
                    if (response != null) {
                        dispatch(login(response.data));
                        navigate("/");
                        return;
                    }
                } catch (error) {
                    console.log("Access token is expired , truing refresh token", error);
                }
            }

            if (refreshToken) {
                try {
                    const response = await makeGetRequest("/users/refresh", true);
                    if (response != null) {
                        dispatch(login(response.data));
                        navigate("/");
                        return;
                    }
                } catch (error) {
                    console.log("Refresh token is expired , login again", error);
                }
            }
        };

        checkLogin();
    }, []);

    const LoginHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const response = await makePostRequest("/users/login", formData, true);

            if (response && response.data) {
                const { accessToken, refreshToken } = response.data;

                if (accessToken && refreshToken) {
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    dispatch(login(response.data));
                    navigate("/");
                } else {
                    console.error("Error: Tokens missing in response");
                }
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <>
            <form onSubmit={LoginHandler}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email" required />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>

            <div className="flex justify-center mt-3">
                <p> Do not have an account? </p>
                <Link to="/signup" className="hover:underline">
                    Sign Up
                </Link>
            </div>
        </>
    );
};

export default Login;
