import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
  const [name, setName] = useState("");
  const [inputErr, setInputErr] = useState("");
  const [rows, setRows] = useState([""]);

  const addRows = () => {
    setInputErr("");
    if (name === "") {
      setInputErr("Please enter your name!");
    } else {
      setRows(rows.concat(""));
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "50px", marginBottom: "10px" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Participants</StyledTableCell>
              <StyledTableCell align="center">Option...</StyledTableCell>
              <StyledTableCell align="center">Option...</StyledTableCell>
              <StyledTableCell align="center">Option...</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  <TextField
                    value={row[index]}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ width: "200px" }}
                    size="small"
                    label="Name:"
                  />
                  <br />
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {name === "" ? inputErr : ""}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Checkbox />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Checkbox />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Checkbox />
                </StyledTableCell>
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
        Submit
      </Button>
    </div>
  );
}
