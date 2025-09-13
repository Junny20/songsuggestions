import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Footer.css";

const Footer = () => {
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthNumber = currentDate.getMonth();

    const months = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };

    const currentMonth = months[currentMonthNumber];

    setDate(`${currentMonth} ${currentYear}`);
  }, []);

  return (
    <div id="footerContainer">
      <div id="creditsContainer">
        <p>
          <a target="_blank" href="https://github.com/Junny20">
            ©Junnian Liu
          </a>
        </p>

        <p>
          <a target="_blank" href="https://github.com/katelnyli">
            ©Katelyn Li
          </a>
        </p>
        {date && <p>{date}</p>}
      </div>
      <ul className="footerUL">
        Dependencies:
        <li>
          <a target="blank" href="https://react.dev/">
            React
          </a>
        </li>
        <li>
          <a target="blank" href="https://flask.palletsprojects.com/en/stable/">
            Flask
          </a>
        </li>
        <li>
          <a target="blank" href="https://scikit-learn.org/stable/">
            Scikit Learn
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              navigate("/dependencies");
            }}
          >
            Full list
          </a>
        </li>
      </ul>
      <ul className="footerUL">
        About this project:
        <li>
          <a
            onClick={() => {
              navigate("/dataset");
            }}
          >
            Our dataset used
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              navigate("/model");
            }}
          >
            Our model
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              navigate("/apicalls");
            }}
          >
            Our API Calls
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              navigate("/documentation");
            }}
          >
            Project Documentation
          </a>
        </li>
      </ul>
      <ul className="footerUL">
        Acknowledgements:
        <li>
          <a target="_blank" href="https://cse.ucsd.edu/">
            UCSD CSE Department
          </a>
        </li>
        <li>
          <a target="_blank" href="https://spis.ucsd.edu/">
            UCSD SPIS 2025
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.kaggle.com/datasets/maharshipandya/-spotify-tracks-dataset"
          >
            Spotify Track Dataset on Kaggle
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://developer.spotify.com/documentation/web-api"
          >
            Spotify API
          </a>
        </li>
      </ul>
      <div id="versionContainer">
        <p id="topText">v1.0</p>
        <p id="botText">This project is not affiliated with Spotify.</p>
      </div>
    </div>
  );
};

export default Footer;
