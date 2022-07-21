import "./signIn.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log(`Logged in with ${username} and ${password}`);
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
        <Button style={{ width: "100%" }} variant="contained" onClick={login}>
          Sign-In
        </Button>
      </form>
    </>
  );
};
export default SignIn;
