import "./PollManager.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#292950",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function PollPage() {
  const [poll, setPoll] = useState();
  const [names, setNames] = useState([]);
  const [choices, setChoices] = useState(["", ""]);
  const [options, setOptions] = useState([]);
  const [inputErr, setInputErr] = useState("");

  const token = localStorage.getItem("token");

  let { id } = useParams();

  useEffect(() => {
    const getPolls = () => {
      axios
        .get(`http://localhost:3003/polls/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response :>> ", response);
          setPoll(response.data);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
    };
    const getParticipants = () => {
      axios
        .get(`http://localhost:3003/participants`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response :>> ", response);
          setNames(response.data);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
    };
    const getOptions = () => {
      axios
        .get(`http://localhost:3003/pollItems`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response :>> ", response);
          setOptions(response.data);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
    };
    const getChoices = () => {
      axios
        .get(`http://localhost:3003/choices`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response :>> ", response);
          setChoices(response.data);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
    };
    getPolls();
    getParticipants();
    getOptions();
    getChoices();
    return () => {};
  }, [id, token]);

  const handleChoices = (value, index) => {
    choices[index] = value;
    setChoices(choices);
  };

  const handleOptions = (value, index) => {
    options[index] = value;
    setOptions(options);
  };

  const handleInput = (value, index) => {
    const namesCopy = names.slice();
    namesCopy[index] = value;
    setNames(namesCopy);
  };

  const addNames = () => {
    setInputErr("");
    //todo
    if (names.length) {
      setInputErr("Please enter your name!");
    }
    setNames(names.concat(""));
  };
  return (
    <div style={{ padding: "20px" }}>
      <div className="title-desc">
        <h1>Title: </h1>
        <h3>Description: </h3>
      </div>
      <div className="dashboard">
        <span className="edit" /*onClick={addNames}*/>Edit Poll</span>
      </div>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "50px", marginBottom: "10px" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Participants</StyledTableCell>
              {options.map((option, index) => {
                return (
                  <StyledTableCell
                    align="center"
                    key={index}
                    onChange={(e) => handleOptions(e.target.value, index)}
                  >
                    {option.item_text}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {names.map((name, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  <TextField
                    value={name.name}
                    onChange={(e) => handleInput(e.target.value, index)}
                    sx={{ width: "200px" }}
                    size="small"
                    label="Name:"
                  />
                  <br />
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      paddingLeft: "3px",
                    }}
                  >
                    {name === "" ? inputErr : null}
                  </span>
                </StyledTableCell>
                {choices.map((choice, index) => {
                  return (
                    <StyledTableCell align="center" key={index}>
                      <Checkbox
                        {...label}
                        value={choice.item_id}
                        onChange={(e) => handleChoices(e.target.value, index)}
                      />
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="inherit"
        size="medium"
        onClick={addNames}
      >
        Add
      </Button>
    </div>
  );
}
