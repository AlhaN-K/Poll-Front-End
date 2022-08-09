import "./PollList.css";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const options = ["Delete"];

const ITEM_HEIGHT = 48;
const PollCard = ({ onRemove, pollNumber }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="card-container">
        <Card className="cardStyle">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Delete"}
                  onClick={onRemove}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="plum"
              >
                Poll {pollNumber}:
              </Typography>

              <Typography gutterBottom variant="h6" component="div">
                Title:
              </Typography>
              <Typography gutterBottom fontSize="18px" component="div">
                Participants:
              </Typography>
              <Typography gutterBottom fontSize="18px" component="div">
                Link: <input className="link-input"></input>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
};
export default PollCard;
