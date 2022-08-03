import "./PollList.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";

const PollCard = ({ onRemove, pollNumber }) => {
  return (
    <>
      <div className="card-container">
        <Card className="cardStyle">
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="crimson"
              >
                * Poll {pollNumber} *
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
          <Button size="small" color="secondary">
            Edit
          </Button>{" "}
          <Button size="small" color="secondary" onClick={onRemove}>
            Delete
          </Button>
        </Card>
      </div>
    </>
  );
};
export default PollCard;
