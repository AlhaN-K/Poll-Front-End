import "./SignIn.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
const url = "http://localhost:3003/login";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [incorrectUserPass, setIncorrectUserPass] = useState("");

  const loginPayload = {
    username: username,
    password: password,
  };
  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["authorization"];
    }
  };

  // Login form validation
  const login = async () => {
    setUsernameErr("");
    setPasswordErr("");
    if (username === "" || password === "") {
      setUsernameErr("Username is a required field.");
      setPasswordErr("Password is a required field.");
      return;
    }
    setIncorrectUserPass("");
    const data = await axios
      .post(url, loginPayload)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          setAuthHeader(token);
          navigate("/pollList");
        } else {
          setUsername("");
          setPassword("");
        }
        return data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setIncorrectUserPass("Invalid Username/Password");
        }
      });
  };
  return (
    <>
      <div className="header">
        <h1>Sign-In to your account</h1>
      </div>
      <form>
        <span className="userPassError">{incorrectUserPass}</span>
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
          <span> {username === "" ? usernameErr : ""}</span>
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
          <span>{password === "" ? passwordErr : ""}</span>
        </div>

        <Button
          style={{ width: "100%", marginTop: "30px" }}
          variant="contained"
          onClick={login}
        >
          Sign-In
        </Button>
      </form>
    </>
  );
};
export default SignIn;
