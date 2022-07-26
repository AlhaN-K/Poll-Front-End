import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "../../pages/HomePage/homePage";
import SignIn from "../../pages/Sign-In/signIn";
import PollPage from "../../pages/pollPage";

const App = () => {
  return (
    <>
      {" "}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/poll" element={<PollPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
