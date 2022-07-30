import "./SetOption.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const SetOption = () => {
  const [options, setOptions] = useState(["", ""]);
  // const [count, setCount] = useState(1);
  const addOption = () => {
    setOptions(options.concat(""));
    // setCount(count + 1);
  };
  const removeOption = (e) => {
    e.preventDefault();
    setOptions(options.slice(0, -1));
  };
  const handleChange = (value, index) => {
    options[index] = value;
    setOptions(options);
  };

  // const incrementCount = () => {
  //   setCount(count + 1);
  // };
  return (
    <>
      <div className="header">
        <h1>Schedule an event!</h1>
      </div>
      <form>
        {options.map((currentOption, index) => {
          return (
            <div className="group" key={index}>
              <h4>Option {index + 1}:</h4>
              <TextField
                style={{ width: "100%" }}
                required
                value={currentOption}
                onChange={(e) => handleChange(e.target.value, index)}
                id="filled-required"
                label=""
                variant="outlined"
              />
            </div>
          );
        })}
        <Link to={"/createPoll"}>
          <Button
            style={{ width: "10%", marginRight: "5px" }}
            variant="outlined"
          >
            Back
          </Button>
        </Link>
        {/* <Link to={"/poll"}> */}
        <Button style={{ width: "10%" }} variant="contained">
          Create
        </Button>
        {/* </Link> */}
        <div className="addRemoveBtn">
          <Button
            style={{
              width: "10%",
              fontWeight: "bold",
              fontSize: "18px",
              borderWidth: "2px",
            }}
            variant="outlined"
            onClick={removeOption}
          >
            -
          </Button>
          <Button
            style={{
              width: "10%",
              fontWeight: "bold",
              fontSize: "18px",
              marginLeft: "5px",
              borderWidth: "2px",
            }}
            variant="outlined"
            onClick={addOption}
          >
            +
          </Button>
        </div>
      </form>
    </>
  );
};
export default SetOption;
