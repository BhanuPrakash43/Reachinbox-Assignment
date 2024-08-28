import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { googleLogin } from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Footer from "../components/Footer";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      login(token);
      navigate("/onebox");
    }
  }, [location, login, navigate]);

  const handleGoogleLogin = () => {
    const redirectUrl = `${window.location.origin}/login`;
    googleLogin(redirectUrl);
    console.log(googleLogin(redirectUrl));
  };

  const handleCreateAccount = () => {
    navigate("/create-account");
  };

  return (
    <>
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-2xl h-1/2-vh mt-32 mx-auto flex flex-col items-center bg-gray-900 border border-gray-500 rounded-2xl p-8 sm:max-w-4/5 sm:h-auto sm:p-8">
        <h1 className="text-4xl mb-5 text-white sm:text-3xl text-center">
          Create a new Account
        </h1>
        <button
          className="w-3/4 py-2.5 text-xl text-white bg-gray-900 border border-gray-500 rounded-md cursor-pointer mt-2.5 transition duration-300 ease-in-out hover:bg-gray-800 flex justify-center items-center sm:w-full sm:py-3 sm:text-lg"
          onClick={handleGoogleLogin}
        >
          <FcGoogle
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          Sign Up with Google
        </button>
        <button
          className="mt-8 py-5 px-10 text-xl bg-blue-600 text-white border-none cursor-pointer sm:w-full sm:py-4 sm:text-lg rounded-md"
          onClick={handleCreateAccount}
        >
          Create an Account
        </button>
        <p className="mt-5 text-gray-400 text-center text-xl sm:text-lg">
          Already have an account?{" "}
          <span className="text-gray-400 cursor-pointer hover:underline">
            Sign in
          </span>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Login;
