import "./PollManager.css";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

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

export default function PollPage() {
  const [names, setNames] = useState(["Participant1", "Participant2"]);
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
        <h1>Title:</h1>
        <h3>Description:</h3>
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
                    Option {index + 1}
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
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={choice}
                          onChange={(e) => handleChoices(e.target.value, index)}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio color="success" value={choice} />}
                            label="Y"
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio color="error" value={choice} />}
                            label="N"
                          />
                        </RadioGroup>
                      </FormControl>
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
