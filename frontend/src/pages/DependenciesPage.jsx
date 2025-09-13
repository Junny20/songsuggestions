import React from "react";
import {
  SiFlask,
  SiReact,
  SiVite,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiTensorflow,
} from "react-icons/si";
import matplotlib from "../assets/matplotlib.png";
import "../css/DependenciesPage.css";
import BackButton from "../components/BackButton";

const DependenciesPage = () => {
  return (
    <div>
      <h2 id="dependenciesTitle">Dependencies and Frameworks Used</h2>
      <div id="svgContainer">
        <ul id="group">
          <li id="item" onClick={() => window.open("https://vite.dev/")}>
            <SiVite className="dependencyIcon" color="#646CFF" />
            <p id="label">Vite</p>
          </li>
          <li id="item" onClick={() => window.open("https://react.dev/")}>
            <SiReact className="dependencyIcon" color="#61DAFB" />
            <p id="label">React</p>
          </li>
          <li
            id="item"
            onClick={() =>
              window.open("https://flask.palletsprojects.com/en/stable/")
            }
          >
            <SiFlask className="dependencyIcon" />
            <p id="label">Flask</p>
          </li>
          <li
            id="item"
            onClick={() => window.open("https://scikit-learn.org/stable/")}
          >
            <SiScikitlearn className="dependencyIcon" color="#F7931E" />
            <p id="label">Scikit Learn</p>
          </li>
          <li id="item" onClick={() => window.open("https://numpy.org/")}>
            <SiNumpy className="dependencyIcon" color="#013243" />
            <p id="label">Numpy</p>
          </li>
          <li
            id="item"
            onClick={() => window.open("https://pandas.pydata.org/")}
          >
            <SiPandas className="dependencyIcon" color="#150458" />
            <p id="label">Pandas</p>
          </li>
          <li id="item" onClick={() => window.open("https://matplotlib.org/")}>
            <img
              className="dependencyIcon"
              src={matplotlib}
              alt="matplotib icon"
            ></img>
            <p id="label">Matplotlib</p>
          </li>
          <li
            id="item"
            onClick={() => window.open("https://www.tensorflow.org/")}
          >
            <SiTensorflow className="dependencyIcon" color="#FF6F00" />
            <p id="label">Tensorflow</p>
          </li>
        </ul>
      </div>
      <BackButton path="/music" />
    </div>
  );
};

export default DependenciesPage;
