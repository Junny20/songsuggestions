import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/LoadingPage";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get("access_token");
    const refresh_token = urlParams.get("refresh_token");
    const expires_in = urlParams.get("expires_in");

    if (access_token) {
      console.log("Access Token:", access_token);
      console.log("Refresh Token:", refresh_token);
      console.log("Expires in:", expires_in);

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("expires_in", expires_in);

      navigate("/music");
    } else if (window.location.search.includes("access_token")) {
      console.error(
        "Access token param exists but is invalid or missing output!"
      );
      navigate("/music");
    } else {
      console.error("Access token param does not exist!");
      navigate("/music");
    }
  }, []);

  return <Loading />;
};

export default Callback;
