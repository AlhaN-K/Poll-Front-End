import "./Stepper.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
const pollURL = "http://localhost:3003/polls";
const itemsURL = "http://localhost:3003/pollItems";

const steps = ["Title & Description", "Options"];

export default function CreatePollStepper() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [options, setOptions] = useState([""]);
  const [optionsError, setOptionsError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [link, setLink] = useState("");
  const [completed, setCompleted] = useState({});
  const addOption = () => setOptions(options.concat(""));
  const removeOption = () => setOptions(options.slice(0, -1));

  // Create Unique link
  const createUniqueLink = (id) => {
    return `http://localhost:3003/polls/${id}`;
  };
  // Create poll request
  const createPoll = () => {
    const token = localStorage.getItem("token");
    let pollData = JSON.stringify({
      title: title,
      description: description,
      link: link,
    });

    let pollConfig = {
      method: "post",
      url: pollURL,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: pollData,
    };
    axios(pollConfig)
      .then((response) => {
        const pollId = response.data.insertId;
        createItems(pollId);
        const uniqueLink = createUniqueLink(pollId + 1);
        setLink(uniqueLink);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  };

  // Create items request
  const createItems = (insertId) => {
    const token = localStorage.getItem("token");
    let itemData = JSON.stringify([
      {
        poll_id: insertId,
        item_text: options,
      },
    ]);

    let itemConfig = {
      method: "post",
      url: itemsURL,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: itemData,
    };
    axios(itemConfig)
      .then((secResponse) => {
        console.log("secResponse :>> ", secResponse);
      })
      .catch((secErr) => {
        console.log("secErr :>> ", secErr);
      });
  };

  const handleInputChange = (value, index) => {
    const optionsCopy = options.slice();
    optionsCopy[index] = value;
    setOptions(optionsCopy);
  };
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    setTitleError("");
    setDescriptionError("");
    setOptionsError("");
    if (title === "" || description === "") {
      setTitleError("Title is a required field.");
      setDescriptionError("Description is a required field.");
      return;
    }
    options.forEach((option, index) => {
      if (options[index] === null) {
        setOptionsError("Please set an option");
        return;
      }
    });

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    handleNext();
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%", padding: "30px" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <form>
            <div className="group">
              <h4>Enter Title:</h4>
              <TextField
                style={{ width: "100%" }}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="filled-required"
                label="Title"
                variant="outlined"
              />
              <div className="inputValidation">
                <span>{title === "" ? titleError : ""}</span>
              </div>
            </div>

            <div className="group">
              <h4>Enter Description:</h4>
              <TextField
                style={{ width: "100%" }}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="filled-required"
                label="Desc"
                variant="outlined"
                multiline
                rows={4}
              />{" "}
              <div className="inputValidation">
                <span>{description === "" ? descriptionError : ""}</span>
              </div>
            </div>
          </form>
        )}
        {activeStep === 1 && (
          <form>
            <center>
              <h3>Please set an option!</h3>
            </center>
            {options.map((currentOption, index) => {
              return (
                <div className="group" key={index}>
                  <h4>Option {index + 1}:</h4>
                  <TextField
                    style={{ width: "100%" }}
                    required
                    value={currentOption}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    id="filled-required"
                    label=""
                    variant="outlined"
                  />
                  <div className="inputValidation">
                    <span>{options[index] === null ? optionsError : ""} </span>
                  </div>{" "}
                </div>
              );
            })}
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
            <Button onClick={createPoll}>Create poll</Button>
          </form>
        )}

        {allStepsCompleted() ? (
          <React.Fragment>
            {" "}
            <Typography
              sx={{
                mt: 2,
                mb: 1,
                marginTop: "80px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}
            >
              You are all set !!!
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Link to={"/poll"}>
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Create"
                        : "Complete"}
                    </Button>
                  </Link>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
