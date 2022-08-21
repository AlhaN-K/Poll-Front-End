import "./PollManager.css";
import "react-edit-text/dist/index.css";
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
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { EditText } from "react-edit-text";

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
  const [choices, setChoices] = useState([]);
  const [options, setOptions] = useState([]);
  const [editTitle, setEditTitle] = useState();
  console.log("editTitle :>> ", editTitle);
  const [editDesc, setEditDesc] = useState();
  console.log("editDesc :>> ", editDesc);
  const token = localStorage.getItem("token");

  const { id } = useParams();

  useEffect(() => {
    const getPolls = () => {
      axios
        .get(`http://${BASE_URL}/polls/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("poll data :>> ", response);

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
          console.log("response :>> ", response);
          setNames(response.data);
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
          console.log("response :>> ", response);
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

  // Edit title
  const editedTitle = () => {
    const titleData = {
      title: editTitle,
    };
    const titleConfig = {
      method: "patch",
      url: `http://${BASE_URL}/polls/title/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: titleData,
    };
    axios(titleConfig)
      .then((response) => {
        console.log("title response :>> ", response);
        // setEditTitle(response.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  // Edit description
  const editedDescription = () => {
    const descData = {
      description: editDesc,
    };
    console.log("descData :>> ", descData);
    const descConfig = {
      method: "patch",
      url: `http://${BASE_URL}/polls/description/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: descData,
    };
    axios(descConfig)
      .then((response) => {
        console.log("desc response :>> ", response);
        setEditDesc(response.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
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
      <div className="dashboard"></div>
      <div className="title-desc">
        <h1>
          <EditText
            className="editable-input"
            defaultValue={poll && poll[0].title}
            onBlur={editedTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </h1>
        <h3>
          <EditText
            defaultValue={poll && poll[0].description}
            onSave={editedDescription}
            onChange={(e) => setEditDesc(e.target.value)}
          />
        </h3>
      </div>
      <div className="dashboard"></div>
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
                </StyledTableCell>
                {options.map((choice, index) => {
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
    </div>
  );
}
