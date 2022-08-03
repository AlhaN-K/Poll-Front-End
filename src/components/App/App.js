import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "..//HomePage/HomePage";
import SignIn from "../SignIn/SignIn";
import Stepper from "../CreatePoll/Stepper";
import PollList from "../PollList/PollList";

const App = () => {
  return (
    <>
      {" "}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/createPoll" element={<Stepper />} />
          <Route path="/pollList" element={<PollList />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
