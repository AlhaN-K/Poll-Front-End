import "./PollList.css";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PollList() {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);

  const removePoll = (currentPoll) => {
    setPolls(polls.filter((poll) => poll !== currentPoll));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    // (async () => {
    axios
      .get("http://localhost:3003/polls", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response :>> ", response);
        setPolls(response.data);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
    return () => {};
    // })();
  }, []);
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
      {polls.map((poll, index) => {
        return (
          <Card
            key={poll.ID}
            onRemove={() => removePoll(poll)}
            title={poll.title}
          />
        );
      })}
    </div>
  );
}
