import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "..//HomePage/HomePage";
import SignIn from "../Sign-In/SignIn";
import CreatePoll from "../CreatePoll/CreatePoll";
import SetOption from "../CreatePoll/SetOption";

const App = () => {
  return (
    <>
      {" "}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/createPoll" element={<CreatePoll />} />
          <Route path="/setOption" element={<SetOption />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
