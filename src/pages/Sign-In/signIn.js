import "./signIn.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
// import { Link } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginPayload = {
    username: username,
    password: password,
  };
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const login = () => {
    axios.post("http://localhost:3000/login", loginPayload).then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);
    });
  };
  return (
    <>
      <div className="header">
        <h1>Sign-In to your account</h1>
      </div>
      <form>
        <div className="group">
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
        <div className="group">
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
        {/* <Link to={"/poll"} style={{ color: "white" }}> */}
        <Button style={{ width: "100%" }} variant="contained" onClick={login}>
          Sign-In
        </Button>
        {/* </Link> */}
      </form>
    </>
  );
};
export default SignIn;
