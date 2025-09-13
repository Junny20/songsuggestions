import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBackward } from "react-icons/fa6";
import "../css/BackButton.css";

const BackButton = ({ path }) => {
  const navigate = useNavigate();

  return (
    <button
      id="backButton"
      onClick={() => {
        navigate(path);
      }}
    >
      <FaBackward id="backIcon"/>
    </button>
  );
};

export default BackButton;
