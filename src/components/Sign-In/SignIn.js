import "./SignIn.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
const url = "http://localhost:3000/login";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [incorrectUsername, setIncorrectUsername] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState("");

  const loginPayload = {
    username: username,
    password: password,
  };
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["authorization"];
    }
  };
  // requests users data from backend
  axios
    .post(url, loginPayload)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);
    })
    .catch((error) => console.log("error :>> ", error));

  // Login form validation
  const loginForm = async () => {
    setUsernameErr("");
    setPasswordErr("");
    if (username === "") {
      setUsernameErr("Username is a required field.");
      setPasswordErr("Password is a required field.");
    } else if (password === "") {
      setPasswordErr("Password is a required field.");
    }
    // validates the username & password from db
    setIncorrectUsername("");
    setIncorrectPassword("");
    if (username !== loginPayload.username) {
      setIncorrectUsername("Invalid Username");
    } else if (password !== loginPayload.password) {
      setIncorrectPassword("Invalid Password");
    }
  };
  return (
    <>
      <div className="header">
        <h1>Sign-In to your account</h1>
      </div>
      <form>
        <div className="group-Input">
          <h4>Enter your username:</h4>
          <TextField
            style={{ width: "100%" }}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="filled-required"
            label="Username"
            variant="outlined"
          />
        </div>
        <div className="inputError">
          <span>
            {" "}
            {username === "" ? usernameErr : ""}
            {username !== loginPayload.username ? incorrectUsername : ""}
          </span>
        </div>

        <div className="group-Input">
          <h4>Enter your password:</h4>
          <TextField
            style={{ width: "100%" }}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="filled-required"
            type="password"
            label="Password"
            variant="outlined"
          />
        </div>
        <div className="inputError">
          <span>
            {password === "" ? passwordErr : ""}
            {password !== loginPayload.password ? incorrectPassword : ""}
          </span>
        </div>

        <Button
          style={{ width: "100%", marginTop: "30px" }}
          variant="contained"
          onClick={loginForm}
        >
          Sign-In
        </Button>
      </form>
    </>
  );
};
export default SignIn;
