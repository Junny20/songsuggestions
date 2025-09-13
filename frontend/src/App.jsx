import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StartingPage from "./pages/StartingPage";
import Callback from "./pages/Callback";
import ProfilePage from "./pages/ProfilePage";
import DependenciesPage from "./pages/DependenciesPage";
import DatasetAbout from "./pages/DatasetAbout";
import ModelAbout from "./pages/ModelAbout";
import ApiCallsAbout from "./pages/ApiCallsAbout";
import ProjectDocumentation from "./pages/ProjectDocumentation";
import Loading from "./components/LoadingPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/music" element={<HomePage />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dataset" element={<DatasetAbout />} />
        <Route path="/model" element={<ModelAbout />} />
        <Route path="/apicalls" element={<ApiCallsAbout />} />
        <Route path="/documentation" element={<ProjectDocumentation />} />
        <Route path="/dependencies" element={<DependenciesPage />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
