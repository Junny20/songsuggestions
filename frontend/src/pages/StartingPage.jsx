import React, { useState } from "react";
import "../css/Login.css";
import { FaSpotify } from "react-icons/fa";
import field from "../assets/field_back.jpg";

const StartingPage = () => {
  const CLIENT_ID = "519ca8b90e8f477c8b001a0c8a4e21f2";
  const SCOPES = "user-top-read";
  const REDIRECT_URI =
    "https://musicrecommender-production.up.railway.app/redirectPage"; //handled through our flask backend

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;

    window.location.href = authUrl;
  };

  return (
    <div id="pageContainer">
      <div id="fullContain">
        <div id="loginContainer">
          <h1 id="loginTitle">Log in with Spotify!</h1>
          <button id="loginButton" onClick={handleLogin}>
            <FaSpotify id="spotifyIcon" />
          </button>
        </div>
        <img src={field} id="fieldImage" />
      </div>
    </div>
  );
};

export default StartingPage;
