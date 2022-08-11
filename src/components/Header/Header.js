import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
export default function Header() {
  const token = localStorage.getItem("token");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "#232127" }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <WorkspacesIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/"} style={{ color: "white" }}>
              Pollymar
            </Link>
          </Typography>
          <Button
            style={{ fontWeight: "bold", border: "1px solid" }}
            color="inherit"
          >
            {token ? (
              <Link to={"/pollList"} style={{ color: "white" }}>
                My Polls
              </Link>
            ) : (
              <Link to={"/signin"} style={{ color: "white" }}>
                My Polls
              </Link>
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
