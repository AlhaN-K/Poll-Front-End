import "./CreatePoll.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <h1>Schedule an event!</h1>
      </div>
      <form>
        <div className="group">
          <h4>Enter Title:</h4>
          <TextField
            style={{ width: "100%" }}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="filled-required"
            label="Title"
            variant="outlined"
          />
        </div>
        <div className="group">
          <h4>Enter Description:</h4>
          <TextField
            style={{ width: "100%" }}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="filled-required"
            label="Desc"
            variant="outlined"
            multiline
            rows={4}
          />
        </div>
        <Button
          style={{ width: "100%" }}
          variant="contained"
          onClick={() => navigate("/setOption")}
        >
          Next
        </Button>
      </form>
    </>
  );
};

export default CreatePoll;
