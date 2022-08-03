import "./CreatePoll.css";
import "./SetOption.css";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const steps = ["Title & Description", "Options", "Get Link"];

export default function CreatePollStepper() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const addOption = () => setOptions(options.concat(""));
  const removeOption = () => setOptions(options.slice(0, -1));

  const handleInputChange = (value, index) => {
    options[index] = value;
    setOptions(options);
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
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
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
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
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
              />
            </div>
          </form>
        )}
        {activeStep === 1 && (
          <form>
            {options.map((currentOption, index) => {
              return (
                <div className="group" key={index}>
                  <h4>Option {index + 1}:</h4>
                  <TextField
                    style={{ width: "100%" }}
                    required
                    value={currentOption}
                    onChange={(e) => handleInputChange(e.target.value)}
                    id="filled-required"
                    label=""
                    variant="outlined"
                  />
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
          </form>
        )}
        {allStepsCompleted() ? (
          <React.Fragment>
            {" "}
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're all set
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
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Create"
                      : "Complete"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
