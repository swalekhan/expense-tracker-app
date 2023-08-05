import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.8)",
          borderBottom: "2px solid black",
          boxShadow: "0 0px 2px 0px #ccc",
        }}
      >
        <Toolbar>
          <Typography variant="h5" component="h1" color="inherit" fontWeight="bold" sx={{fontSize:"16px"}}>
           <Link to= "/"> Expense Tracker</Link>
          </Typography>
          <Box ml="auto">

            <Buttons />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
