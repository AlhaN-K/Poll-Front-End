import "./PollList.css";
import React, { useState } from "react";
import Card from "./Card";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function PollList() {
  const navigate = useNavigate();
  const [polls, setPolls] = useState(["a", "b", "c"]);
  const removePoll = (currentPoll) => {
    setPolls(polls.filter((poll) => poll !== currentPoll));
  };
  return (
    <div>
      <div className="btn-container">
        <Button
          onClick={() => navigate("/createPoll")}
          variant="contained"
          color="inherit"
          style={{ display: "flex", justifyContent: "center" }}
        >
          New Poll
        </Button>
      </div>
      {polls.map((currentPoll, index) => {
        return (
          <Card
            key={index}
            onRemove={() => removePoll(currentPoll)}
            pollNumber={index + 1}
          />
        );
      })}
    </div>
  );
}
