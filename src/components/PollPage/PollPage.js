import "./PollPage.css";
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
import { BASE_URL } from "../../constants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
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
  const [rows, setRows] = useState([]);
  const [names, setNames] = useState();
  const [choices, setChoices] = useState([]);
  const [options, setOptions] = useState([]);

  const token = localStorage.getItem("token");

  const { id } = useParams();

  // loading poll data
  useEffect(() => {
    const getPolls = () => {
      axios
        .get(`http://${BASE_URL}/polls/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("get poll :>> ", response);
          setPoll(response.data);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
    };
    const getParticipants = () => {
      axios
        .get(`http://${BASE_URL}/participants/id/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("get participants :>> ", response);
          setRows(response.data);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
    };
    const getOptions = () => {
      axios
        .get(`http://${BASE_URL}/pollItems/id/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("get items :>> ", response);
          setOptions(response.data);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
    };
    const getChoices = () => {
      axios
        .get(`http://${BASE_URL}/choices/id/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("get choices :>> ", response);
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

  // create participant
  const createParticipant = () => {
    const data = JSON.stringify({
      poll_id: id,
      name: names,
    });
    let particConfig = {
      method: "post",
      url: `http://${BASE_URL}/participants`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios(particConfig)
      .then((response) => {
        console.log("participant created:>> ", response);
        setNames(response.data);
        createChoices(response.data.insertId);
      })
      .then(() => {
        return axios.get(`http://${BASE_URL}/participants`);
      })
      .catch((error) => {
        console.log("participnt error :>> ", error);
      });
  };

  // Create choices
  const createChoices = (participantId) => {
    const data = JSON.stringify({
      item_id: options[0],
      participant_id: participantId,
    });
    let choiceConfig = {
      method: "post",
      url: `http://${BASE_URL}/choices`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios(choiceConfig)
      .then((response) => {
        console.log("choice created :>> ", response);
        setChoices(response.data);
      })
      .then(() => {
        return axios.get(`http://${BASE_URL}/choices`);
      })
      .catch((error) => {
        console.log("choice error :>> ", error);
      });
  };

  // Add to rows
  const newRow = () => {
    setRows(rows.concat(""));
  };

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

  return (
    <div style={{ padding: "20px" }}>
      <div className="title-desc-style">
        <h1>{poll && poll[0].title}</h1>
        <h3>{poll && poll[0].description}</h3>
        <h4>{`${window.location.host}/polls/${poll && poll[0].ID}`}</h4>
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
                    key={option.ID}
                    onChange={(e) => handleOptions(e.target.value, index)}
                  >
                    {option.item_text}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((name, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  <TextField
                    value={name.name}
                    onChange={(e) => handleInput(e.target.value, index)}
                    sx={{ width: "200px" }}
                    size="small"
                    label="Name:"
                  />
                </StyledTableCell>
                {options.map((choice, index) => {
                  return (
                    <StyledTableCell align="center" key={index}>
                      <Checkbox
                        // checked={true}
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
      </TableContainer>{" "}
      <Button
        style={{ marginRight: "5px" }}
        variant="contained"
        color="inherit"
        size="medium"
        onClick={newRow}
      >
        New
      </Button>
      <Button
        variant="contained"
        color="inherit"
        size="medium"
        onClick={createParticipant}
      >
        Submit
      </Button>
    </div>
  );
}
