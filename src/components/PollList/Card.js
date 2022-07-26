import "./PollList.css";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ITEM_HEIGHT = 48;
const PollCard = ({ onRemove, onManage, title, link, total }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [copy, setCopy] = React.useState({
    copied: false,
    value: `${window.location.host}/polls/${link}`,
  });
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
              <MenuItem onClick={onRemove}>Delete</MenuItem>
              <MenuItem onClick={onManage}>Manage Poll</MenuItem>
            </Menu>
          </div>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="header"
                color="plum"
              >
                {title}
              </Typography>
              <Typography gutterBottom fontSize="18px" component="div">
                Participants:{total}
              </Typography>
              <Typography gutterBottom fontSize="18px" component="div">
                Link:
                <input
                  value={copy.value}
                  className="link-input"
                  readOnly={true}
                  onChange={({ target: value }) =>
                    setCopy({ value, copied: false })
                  }
                ></input>
                <CopyToClipboard
                  text={copy.value}
                  onCopy={() => setCopy({ copied: true })}
                >
                  <Button style={{ fontWeight: "bold" }} color="secondary">
                    Copy
                  </Button>
                </CopyToClipboard>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
};
export default PollCard;
