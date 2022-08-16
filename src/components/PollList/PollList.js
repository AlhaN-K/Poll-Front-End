import "./PollList.css";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PollList() {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);

  const token = localStorage.getItem("token");

  const deletePoll = (id) => {
    axios
      .delete(`http://localhost:3003/polls/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        return axios.get(`http://localhost:3003/polls`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res) => {
        setPolls(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  const managePoll = (id) => {
    axios
      .get(`http://localhost:3003/polls/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPolls(res.data);
        navigate("/manage");
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  useEffect(() => {
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
  }, [token]);
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
            title={poll.title}
            onRemove={() => deletePoll(poll.ID)}
            onManage={() => managePoll(poll.ID)}
          />
        );
      })}
    </div>
  );
}
