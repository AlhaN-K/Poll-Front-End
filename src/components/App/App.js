import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "..//HomePage/HomePage";
import SignIn from "../SignIn/SignIn";
import Stepper from "../CreatePoll/Stepper";
import PollList from "../PollList/PollList";
import PollPage from "../PollPage/PollPage";
import PollManager from "../PollManager/PollManager";
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
          <Route path="/polls/:id" element={<PollPage />} />
          <Route path="/manage/:id" element={<PollManager />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
