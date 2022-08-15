import "./PollPage.css";
import React, { useState } from "react";
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
  const [rows, setRows] = useState([""]);
  const [choices, setChoices] = useState(["", ""]);
  const [options, setOptions] = useState(["", ""]);
  const [inputErr, setInputErr] = useState("");

  const handleChoices = (value, index) => {
    choices[index] = value;
    setChoices(choices);
  };

  const handleOptions = (value, index) => {
    options[index] = value;
    setOptions(options);
  };

  const handleInput = (value, index) => {
    const rowsCopy = rows.slice();
    rowsCopy[index] = value;
    setRows(rowsCopy);
  };

  const addRows = () => {
    setInputErr("");
    //todo
    if (rows.length) {
      setInputErr("Please enter your name!");
    }
    setRows(rows.concat(""));
  };
  return (
    <div style={{ padding: "20px" }}>
      <div className="title-desc-style">
        <h1>Title:</h1>
        <h3>Description:</h3>
        <h4>Poll Link:</h4>
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
                    Option {index + 1}
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
                    value={name}
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
                      {" "}
                      <Checkbox
                        {...label}
                        value={choice}
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
        onClick={addRows}
      >
        Add
      </Button>
    </div>
  );
}
