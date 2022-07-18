import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "#232127" }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2 }}
          >
            <WorkspacesIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Pollymar
          </Typography>
          <Button style={{ fontWeight: "bold" }} color="inherit">
            My Polls
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
